'use client';

import { useState, useEffect } from 'react';
import './styles.css';

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
    <div className="page">
      {/* Header */}
      <header className="hero">
        <h1><span style={{ fontWeight: 700 }}>Qian</span> HE</h1>
      </header>

      {/* Statistics */}
      <section className="stats">
        <div className="card">
          <div className="card-title">GitHub Stars</div>
          <div className="card-value">9,940+</div>
        </div>
        <div className="card">
          <div className="card-title">Projects</div>
          <div className="card-value">11</div>
        </div>
        <div className="card">
          <div className="card-title">Research Focus</div>
          <div className="card-value" style={{ fontSize: '24px', marginTop: '14px' }}>AI & CV</div>
        </div>
        <div className="card">
          <div className="card-title">Organization</div>
          <div className="card-value" style={{ fontSize: '24px', marginTop: '14px' }}>ByteDance</div>
        </div>
      </section>

      {/* Open Source Projects */}
      <section className="panel" style={{ marginBottom: '20px' }}>
        <h2 className="panel-title">Open Source Projects</h2>
        <div className="repo-table-wrapper">
          <table className="repo-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Stars</th>
              </tr>
            </thead>
            <tbody>
              {displayedProjects.map((project, index) => (
                <tr key={index}>
                  <td className="repo-link">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      {project.name}
                    </a>
                  </td>
                  <td className="repo-desc">{project.description}</td>
                  <td className="repo-stars">
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
          <div className="pagination">
            {Array.from({ length: totalProjectsPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setProjectsPage(i + 1)}
                className={`page-btn ${projectsPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Research Papers */}
      <section className="panel">
        <h2 className="panel-title">Publications</h2>
        <div className="subtitle" style={{ marginTop: 0, marginBottom: '16px' }}>
          Selected publications. For a complete list, please visit my{' '}
          <a 
            href="https://scholar.google.com/citations?hl=zh-CN&user=9rWWCgUAAAAJ&view_op=list_works&sortby=pubdate"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#2f6bff', textDecoration: 'none', fontWeight: 600 }}
          >
            Google Scholar
          </a>
          {' '}profile.
        </div>
        <table className="paper-table">
          <tbody>
            {displayedPapers.map((paper, index) => (
              <tr key={index}>
                <td style={{ paddingRight: '16px' }} className="year">{paper.year}</td>
                <td>
                  <div className="title-line">
                    <span className="title">{paper.title}</span>
                    {paper.arxiv && (
                      <a 
                        href={paper.arxiv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="arxiv"
                      >
                        arXiv
                      </a>
                    )}
                  </div>
                  <div className="meta">{paper.authors}</div>
                  <div className="meta">{paper.venue}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Papers Pagination */}
        {totalPapersPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPapersPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPapersPage(i + 1)}
                className={`page-btn ${papersPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </footer>
    </div>
  );
}
