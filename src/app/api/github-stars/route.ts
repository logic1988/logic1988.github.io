import { NextRequest, NextResponse } from 'next/server';

interface GitHubRepo {
  stargazers_count: number;
  full_name: string;
  html_url: string;
}

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();
    
    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'URLs array is required' }, { status: 400 });
    }

    const results = await Promise.allSettled(
      urls.map(async (url: string) => {
        // Extract owner and repo from GitHub URL
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {
          throw new Error(`Invalid GitHub URL: ${url}`);
        }

        const [, owner, repo] = match;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

        const response = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-Site',
          },
        });

        if (!response.ok) {
          throw new Error(`GitHub API error for ${owner}/${repo}`);
        }

        const data: GitHubRepo = await response.json();
        
        return {
          url: url,
          stars: data.stargazers_count,
          fullName: data.full_name,
          htmlUrl: data.html_url,
        };
      })
    );

    const repos = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<{ url: string; stars: number; fullName: string; htmlUrl: string }>).value);

    return NextResponse.json({ repos });
  } catch (error) {
    console.error('GitHub stars fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stars', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
