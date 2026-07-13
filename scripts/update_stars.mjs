import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const project_root = path.resolve(__dirname, '..');
const projects_path = path.join(project_root, 'src', 'data', 'projects.json');
const github_token = process.env.GITHUB_TOKEN;

const get_github_repo = url => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') return null;

    const [owner, repo] = parsed.pathname.split('/').filter(Boolean);
    if (!owner || !repo) return null;

    return { owner, repo: repo.replace(/\.git$/, '') };
  } catch {
    return null;
  }
};

const fetch_repo_stars_from_html = async ({ owner, repo }) => {
  const response = await fetch(`https://github.com/${owner}/${repo}`, {
    headers: {
      'User-Agent': 'logic1988-github-pages-star-updater',
    },
  });

  if (!response.ok) {
    throw new Error(`${owner}/${repo}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const match = html.match(/([0-9][0-9,]*) users starred this repository/);
  if (!match) {
    throw new Error(`${owner}/${repo}: missing stargazer count in GitHub HTML`);
  }

  return Number(match[1].replaceAll(',', ''));
};

const fetch_repo_stars = async ({ owner, repo }) => {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'logic1988-github-pages-star-updater',
  };

  if (github_token) {
    headers.Authorization = `Bearer ${github_token}`;
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  if (!response.ok) {
    const remaining = response.headers.get('x-ratelimit-remaining');
    if (response.status === 403 && remaining === '0') {
      return fetch_repo_stars_from_html({ owner, repo });
    }

    throw new Error(`${owner}/${repo}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (typeof data.stargazers_count !== 'number') {
    throw new Error(`${owner}/${repo}: missing stargazers_count`);
  }

  return data.stargazers_count;
};

const main = async () => {
  const raw = await readFile(projects_path, 'utf8');
  const projects = JSON.parse(raw);
  const updated_at = new Date().toISOString().split('T')[0];

  for (const project of projects) {
    const repo = get_github_repo(project.url);
    if (!repo) continue;

    const stars = await fetch_repo_stars(repo);
    project.stars = stars;
    project.stars_updated_at = updated_at;
    console.log(`${repo.owner}/${repo.repo}: ${stars}`);
  }

  await writeFile(projects_path, `${JSON.stringify(projects, null, 2)}\n`);
};

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
