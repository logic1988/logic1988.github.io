'use client';

import { useState, useEffect } from 'react';

interface GitHubRepo {
  url: string;
  stars: number;
  fullName: string;
  htmlUrl: string;
}

interface Project {
  name: string;
  description: string;
  url: string;
  stars?: string | number;
}

interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: string;
  arxiv?: string;
}

const PROJECTS_PER_PAGE = 5;
const PAPERS_PER_PAGE = 5;

export default function Home() {
  const [githubRepos, setGithubRepos] = useState<Map<string, GitHubRepo>>(new Map());
  const [projectsPage, setProjectsPage] = useState(1);
  const [papersPage, setPapersPage] = useState(1);

  const baseProjects: Project[] = [
    {
      name: 'PuLID',
      description: '人物ID保持插件, Flux 上开源最优',
      url: 'https://github.com/ToTheBeginning/PuLID',
      stars: '3.5k'
    },
    {
      name: 'DreamO',
      description: '图像一致性模型flux版本',
      url: 'https://github.com/bytedance/DreamO',
      stars: '1.7k'
    },
    {
      name: 'Phantom',
      description: '视频一致性 Wanx1.3b版本',
      url: 'https://github.com/Phantom-video/Phantom',
      stars: '1.5k'
    },
    {
      name: 'UNO',
      description: '一致性合成数据链路flux版本',
      url: 'https://github.com/bytedance/UNO',
      stars: '1.3k'
    },
    {
      name: 'USO',
      description: '风格化+主体一致性生成',
      url: 'https://github.com/bytedance/USO',
      stars: '1.2k'
    },
    {
      name: 'Humo',
      description: '多模态人物视频生成',
      url: 'https://github.com/phantom-video/humo',
      stars: '1.1k'
    },
    {
      name: 'DreamID-V',
      description: '视频换脸',
      url: 'https://huggingface.co/XuGuo699/DreamID-V',
      stars: '460'
    },
    {
      name: 'HyperLora',
      description: '图像ID lora优化',
      url: 'https://github.com/bytedance/ComfyUI-HyperLoRA',
      stars: '400+'
    },
    {
      name: 'RealCustom',
      description: 'IP保持XL版本',
      url: 'https://github.com/bytedance/RealCustom',
      stars: '100'
    },
    {
      name: 'DreamID',
      description: '图片换脸最强效果',
      url: 'https://superhero-7.github.io/DreamID/',
      stars: '100'
    },
    {
      name: 'I2VControl',
      description: '视频运动运镜控制通用方案',
      url: 'https://github.com/WanquanF/I2VControl',
      stars: '100'
    }
  ];

  const basePapers: Paper[] = [
    {
      title: 'Phantom: Subject-consistent video generation via cross-modal alignment',
      authors: 'Liu, Lijie; Ma, Tianxiang; Li, Bingchuan; Chen, Zhuowei; et al.',
      venue: 'ICCV',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2410.05592'
    },
    {
      title: 'I2vcontrol: Disentangled and unified video motion synthesis control',
      authors: 'Feng, Wanquan; Qi, Tianhao; Liu, Jiawei; Sun, Mingzhen; et al.',
      venue: 'ICCV',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2410.08455'
    },
    {
      title: 'Dreamid: High-fidelity and fast diffusion-based face swapping via triplet id group learning',
      authors: 'Li, Xinghui; Sun, Qichao; Zhang, Pengze; Ye, Fulong; et al.',
      venue: 'SIGGRAPH Asia',
      year: '2025'
    },
    {
      title: 'Dreamo: A unified framework for image customization',
      authors: 'Mou, Chong; Wu, Yanze; Wu, Wenxu; Guo, Zinan; et al.',
      venue: 'SIGGRAPH Asia',
      year: '2025'
    },
    {
      title: 'Realcustom: Narrowing real text word for real-time open-domain text-to-image customization',
      authors: 'Huang, Mengqi; Mao, Zhendong; Liu, Mingcong; He, Qian; et al.',
      venue: 'CVPR',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2405.04741'
    },
    {
      title: 'Deadiff: An efficient stylization diffusion model with disentangled representations',
      authors: 'Qi, Tianhao; Fang, Shancheng; Wu, Yanze; Xie, Hongtao; et al.',
      venue: 'CVPR',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2403.14798'
    },
    {
      title: 'Dreamidentity: Enhanced editability for efficient face-identity preserved image generation',
      authors: 'Chen, Zhuowei; Fang, Shancheng; Liu, Wei; He, Qian; et al.',
      venue: 'AAAI',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2405.09889'
    },
    {
      title: 'Pulid: Pure and lightning id customization via contrastive alignment',
      authors: 'Guo, Zinan; Wu, Yanze; Zhuowei, Chen; Zhang, Peng; et al.',
      venue: 'NeurIPS',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2404.16028'
    },
    {
      title: 'Ar-diffusion: Asynchronous video generation with auto-regressive diffusion',
      authors: 'Sun, Mingzhen; Wang, Weining; Li, Gen; Liu, Jiawei; et al.',
      venue: 'CVPR',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2410.16184'
    },
    {
      title: 'Anydressing: Customizable multi-garment virtual dressing via latent diffusion models',
      authors: 'Li, Xinghui; Sun, Qichao; Zhang, Pengze; Ye, Fulong; et al.',
      venue: 'CVPR',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2411.15667'
    },
    {
      title: 'Reganie: Rectifying gan inversion errors for accurate real image editing',
      authors: 'Li, Bingchuan; Ma, Tianxiang; Zhang, Peng; Hua, Miao; et al.',
      venue: 'AAAI',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2303.02994'
    },
    {
      title: 'Semantic 3d-aware portrait synthesis and manipulation based on compositional neural radiance field',
      authors: 'Ma, Tianxiang; Li, Bingchuan; He, Qian; Dong, Jing; et al.',
      venue: 'AAAI',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2302.14163'
    },
    {
      title: 'Region-aware face swapping',
      authors: 'Xu, Chao; Zhang, Jiangning; Hua, Miao; He, Qian; et al.',
      venue: 'CVPR',
      year: '2022',
      arxiv: 'https://arxiv.org/abs/2203.13218'
    },
    {
      title: 'Xmp-font: Self-supervised cross-modality pre-training for few-shot font generation',
      authors: 'Liu, Wei; Liu, Fangyue; Ding, Fei; He, Qian; et al.',
      venue: 'CVPR',
      year: '2022',
      arxiv: 'https://arxiv.org/abs/2203.08012'
    },
    {
      title: 'DyStyle: Dynamic neural network for multi-attribute-conditioned style editings',
      authors: 'Li, Bingchuan; Cai, Shaofei; Liu, Wei; Zhang, Peng; et al.',
      venue: 'WACV',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2210.07476'
    }
  ];

  // Top conferences ranking for sorting
  const venueRank: { [key: string]: number } = {
    'CVPR': 1,
    'ICCV': 2,
    'NeurIPS': 3,
    'ICML': 4,
    'AAAI': 5,
    'IJCAI': 6,
    'SIGGRAPH': 7,
    'SIGGRAPH Asia': 8,
    'WACV': 9,
  };

  // Sort papers: by venue rank (higher priority first), then by year (newer first)
  const sortedPapers = [...basePapers].sort((a, b) => {
    const rankA = venueRank[a.venue] || 100;
    const rankB = venueRank[b.venue] || 100;
    
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    
    // Same venue, sort by year descending
    return parseInt(b.year) - parseInt(a.year);
  });

  useEffect(() => {
    // Fetch GitHub stars for repositories
    const githubUrls = baseProjects
      .map(p => p.url)
      .filter(url => url.includes('github.com'));

    if (githubUrls.length > 0) {
      fetch('/api/github-stars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: githubUrls }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.repos) {
            const repoMap = new Map<string, GitHubRepo>();
            data.repos.forEach((repo: GitHubRepo) => {
              repoMap.set(repo.url, repo);
            });
            setGithubRepos(repoMap);
          }
        })
        .catch(err => console.error('Failed to fetch GitHub stars:', err));
    }
  }, []);

  // Get stars for a project
  const getProjectStars = (project: Project): number | string => {
    const repo = githubRepos.get(project.url);
    if (repo) {
      return repo.stars;
    }
    return project.stars || 0;
  };

  // Sort projects by stars (descending)
  const sortedProjects = [...baseProjects].sort((a, b) => {
    const starsA = getProjectStars(a);
    const starsB = getProjectStars(b);
    const numA = typeof starsA === 'string' ? parseFloat(starsA) * (starsA.includes('k') ? 1000 : 1) : starsA;
    const numB = typeof starsB === 'string' ? parseFloat(starsB) * (starsB.includes('k') ? 1000 : 1) : starsB;
    return numB - numA;
  });

  // Pagination
  const totalProjectsPages = Math.ceil(sortedProjects.length / PROJECTS_PER_PAGE);
  const totalPapersPages = Math.ceil(sortedPapers.length / PAPERS_PER_PAGE);

  const displayedProjects = sortedProjects.slice(
    (projectsPage - 1) * PROJECTS_PER_PAGE,
    projectsPage * PROJECTS_PER_PAGE
  );

  const displayedPapers = sortedPapers.slice(
    (papersPage - 1) * PAPERS_PER_PAGE,
    papersPage * PAPERS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl font-light tracking-wide mb-2">
            <span className="font-medium">Qian</span> HE
          </h1>
        </header>

        {/* Statistics */}
        <section className="mb-16">
          <h2 className="text-lg font-medium mb-6">Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">GitHub Stars</p>
              <p className="text-3xl font-light">9,940+</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Projects</p>
              <p className="text-3xl font-light">11</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Research Focus</p>
              <p className="text-sm font-light text-gray-700">AI & CV</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Organization</p>
              <p className="text-sm font-light text-gray-700">ByteDance</p>
            </div>
          </div>
        </section>

        {/* Open Source Projects */}
        <section className="mb-16" id="repositories">
          <h2 className="text-lg font-medium mb-6">
            <a href="#repositories" className="text-gray-800 hover:text-gray-600">
              Open Source Projects
            </a>
          </h2>
          <div className="border-t pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium text-gray-700">Project</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700">Description</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700">Stars</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProjects.map((project, index) => (
                    <tr 
                      key={index} 
                      className={`border-b hover:bg-gray-50 ${index === displayedProjects.length - 1 && projectsPage === totalProjectsPages ? 'border-b-0' : ''}`}
                    >
                      <td className="py-3 px-2">
                        <a 
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {project.name}
                        </a>
                      </td>
                      <td className="py-3 px-2 text-gray-600">
                        {project.description}
                      </td>
                      <td className="py-3 px-2 text-right font-medium">
                        {typeof getProjectStars(project) === 'number' 
                          ? getProjectStars(project).toLocaleString() 
                          : getProjectStars(project)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Projects Pagination */}
            {totalProjectsPages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: totalProjectsPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setProjectsPage(i + 1)}
                    className={`px-4 py-2 rounded text-sm ${
                      projectsPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Research Papers */}
        <section className="mb-16" id="papers">
          <h2 className="text-lg font-medium mb-6">
            <a href="#papers" className="text-gray-800 hover:text-gray-600">
              Publications
            </a>
          </h2>
          <div className="border-t pt-6">
            <p className="text-gray-600 mb-6">
              Selected publications. For a complete list, please visit my{' '}
              <a 
                href="https://scholar.google.com/citations?hl=zh-CN&user=9rWWCgUAAAAJ&view_op=list_works&sortby=pubdate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Scholar
              </a>
              {' '}profile.
            </p>
            <div className="space-y-6">
              {displayedPapers.map((paper, index) => (
                <div key={index} className={`pb-6 ${index < displayedPapers.length - 1 || papersPage < totalPapersPages ? 'border-b' : ''}`}>
                  <h3 className="font-medium text-gray-900 mb-2">
                    {paper.title}
                    {paper.arxiv && (
                      <a 
                        href={paper.arxiv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-blue-600 hover:underline"
                      >
                        [arXiv]
                      </a>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {paper.authors}
                  </p>
                  <p className="text-sm text-blue-600">
                    {paper.venue}
                    <span className="text-gray-500"> • {paper.year}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Papers Pagination */}
            {totalPapersPages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: totalPapersPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPapersPage(i + 1)}
                    className={`px-4 py-2 rounded text-sm ${
                      papersPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t text-sm text-gray-500">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
