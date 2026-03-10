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
  widelyApplied?: boolean;
}

const PROJECTS_PER_PAGE = 6;
const PAPERS_PER_PAGE = 10;

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
      title: 'DreamStyle: A Unified Framework for Video Stylization',
      authors: 'He, Qian; et al.',
      venue: 'CVPR',
      year: '2026',
      widelyApplied: false
    },
    {
      title: 'Scaling4D: Pushing the Frontier of Video Novel View Synthesis through Large-Scale Monocular Videos',
      authors: 'He, Qian; et al.',
      venue: 'CVPR',
      year: '2026',
      widelyApplied: false
    },
    {
      title: 'OmniTransfer: All-in-one Framework for Spatio-temporal Video Transfer',
      authors: 'He, Qian; et al.',
      venue: 'CVPR',
      year: '2026',
      widelyApplied: false
    },
    {
      title: 'Unified Customized Generation by Disentangled Reward Modeling',
      authors: 'He, Qian; et al.',
      venue: 'CVPR',
      year: '2026',
      widelyApplied: false
    },
    {
      title: 'Scaling Multi-Identity Consistency for Image Customization via Multi-to-Multi Matching Paradigm',
      authors: 'Cheng, Yufeng; Wu, Wenxu; Wu, Shaojin; Huang, Mengqi; Ding, Fei; He, Qian;',
      venue: 'CVPR',
      year: '2026',
      widelyApplied: false
    },
    {
      title: 'Phantom-Data: Towards a General Subject-Consistent Video Generation Dataset',
      authors: 'Chen, Zhuowei; Li, Bingchuan; Ma, Tianxiang; Liu, Lijie; Liu, Mingcong; Zhang, Yi; Li, Gen; Li, Xinghui; Zhou, Siyu; He, Qian;',
      venue: 'ICLR',
      year: '2026',
      widelyApplied: false
    },
    {
      title: 'HuMo: Human-Centric Video Generation via Collaborative Multi-Modal Conditioning',
      authors: 'Chen, Liyang; Ma, Tianxiang; Liu, Jiawei; Li, Bingchuan; Chen, Zhuowei; Liu, Lijie; He, Xu; Li, Gen; He, Qian; Wu, Zhiyong;',
      venue: 'AAAI',
      year: '2026',
      widelyApplied: false
    },
    {
      title: 'I2VControl-Camera: Precise Video Camera Control with Adjustable Motion Strength',
      authors: 'Feng, Wanquan; Liu, Jiawei; Tu, Pengqi; Qi, Tianhao; Sun, Mingzhen; Ma, Tianxiang; Zhao, Songtao; Zhou, Siyu; He, Qian;',
      venue: 'ICLR',
      year: '2025',
      widelyApplied: false
    },
    {
      title: 'HyperLora: Parameter-Efficient Adaptive Generation for Portrait Synthesis',
      authors: 'He, Qian; et al.',
      venue: 'CVPR',
      year: '2025',
      widelyApplied: false
    },
    {
      title: 'AnyDressing: Customizable Multi-Garment Virtual Dressing via Latent Diffusion Models',
      authors: 'Li, Xinghui; Sun, Qichao; Zhang, Pengze; Ye, Fulong; Liao, Zhichao; Feng, Wanquan; Zhao, Songtao; He, Qian;',
      venue: 'CVPR',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2411.15667',
      widelyApplied: false
    },
    {
      title: 'Asynchronous Video Generation with Autoregressive Diffusion',
      authors: 'Sun, Mingzhen; Wang, Weining; Li, Gen; Liu, Jiawei; Sun, Jiahui; Feng, Wanquan; Lao, Shanshan; Zhou, SiYu; He, Qian; Liu, Jing;',
      venue: 'CVPR',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2410.16184',
      widelyApplied: false
    },
    {
      title: 'Mask^2DiT: Dual Mask-based Diffusion Transformer for Multi-Scene Long Video Generation',
      authors: 'He, Qian; et al.',
      venue: 'CVPR',
      year: '2025',
      widelyApplied: false
    },
    {
      title: 'I2VControl: Disentangled and Unified Video Motion Synthesis Control',
      authors: 'Feng, Wanquan; Qi, Tianhao; Liu, Jiawei; Sun, Mingzhen; Tu, Pengqi; Ma, Tianxiang; Dai, Fei; Zhao, Songtao; Zhou, Siyu; He, Qian;',
      venue: 'ICCV',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2410.08455',
      widelyApplied: true
    },
    {
      title: 'Less-to-More Generalization: Unlocking More Controllability by In-Context Generation',
      authors: 'He, Qian; et al.',
      venue: 'ICCV',
      year: '2025',
      widelyApplied: false
    },
    {
      title: 'OneGT: One-Shot Geometry-Texture Neural Rendering for Head Avatars',
      authors: 'He, Qian; et al.',
      venue: 'ICCV',
      year: '2025',
      widelyApplied: false
    },
    {
      title: 'Phantom: Subject-Consistent Video Generation via Cross-Modal Alignment',
      authors: 'Liu, Lijie; Ma, Tianxiang; Li, Bingchuan; Chen, Zhuowei; Liu, Jiawei; Li, Gen; Zhou, Siyu; He, Qian; Wu, Xinglong;',
      venue: 'ICCV',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2410.05592',
      widelyApplied: true
    },
    {
      title: 'DreamO: A Unified Framework for Image Customization',
      authors: 'Mou, Chong; Wu, Yanze; Wu, Wenxu; Guo, Zinan; Zhang, Pengze; Cheng, Yufeng; Luo, Yiming; Ding, Fei; Zhang, Shiwen; Li, Xinghui;',
      venue: 'SIGGRAPH Asia',
      year: '2025',
      widelyApplied: true
    },
    {
      title: 'DreamID: A Fast and High-Fidelity diffusion-based Face Swapping via Triplet ID Group Learning',
      authors: 'Li, Xinghui; Sun, Qichao; Zhang, Pengze; Ye, Fulong; Liao, Zhichao; Feng, Wanquan; Zhao, Songtao; Sun, Mingzhen; Hua, Miao; Zhang, Pengze; Li, Xinghui; He, Qian; Wu, Xinglong;',
      venue: 'SIGGRAPH Asia',
      year: '2025',
      widelyApplied: true
    },
    {
      title: 'Pulid: Pure and Lightning ID Customization via Contrastive Alignment',
      authors: 'Guo, Zinan; Wu, Yanze; Zhuowei, Chen; Zhang, Peng; He, Qian;',
      venue: 'NeurIPS',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2404.16028',
      widelyApplied: true
    },
    {
      title: 'RealCustom: Narrowing Real Text Word for Real-Time Open-Domain Text-to-Image Customization',
      authors: 'Huang, Mengqi; Mao, Zhendong; Liu, Mingcong; He, Qian; Zhang, Yongdong;',
      venue: 'CVPR',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2405.04741',
      widelyApplied: false
    },
    {
      title: 'Deadiff: An Efficient Stylization Diffusion Model with Disentangled Representations',
      authors: 'Qi, Tianhao; Fang, Shancheng; Wu, Yanze; Xie, Hongtao; Liu, Jiawei; Chen, Lang; He, Qian; Zhang, Yongdong;',
      venue: 'CVPR',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2403.14798',
      widelyApplied: false
    },
    {
      title: 'DreamIdentity: Enhanced Editability for Efficient Face-identity Preserved Image Generation',
      authors: 'Chen, Zhuowei; Fang, Shancheng; Liu, Wei; He, Qian; Huang, Mengqi; Mao, Zhendong; Zhang, Yongdong;',
      venue: 'AAAI',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2405.09889',
      widelyApplied: false
    },
    {
      title: 'Customize Your Own Paired Data via Few-shot Way',
      authors: 'Chen, Jinshu; Li, Bingchuan; Hua, Miao; Xu, Panpan; He, Qian;',
      venue: 'CVPR Workshop',
      year: '2024',
      widelyApplied: false
    },
    {
      title: 'RealCustom++: Representing Images as Real Text Word for Real-Time Customization',
      authors: 'Mao, Zhendong; Huang, Mengqi; Ding, Fei; Liu, Mingcong; He, Qian; Zhang, Yongdong;',
      venue: 'arXiv',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2408.09744',
      widelyApplied: false
    },
    {
      title: 'UGC: Unified GAN Compression for Efficient Image-to-Image Translation',
      authors: 'Ren, Yuxi; Wu, Jie; Zhang, Peng; Zhang, Manlin; Xiao, Xuefeng; He, Qian; Wang, Rui; Zheng, Min; Pan, Xin;',
      venue: 'ICCV',
      year: '2023',
      widelyApplied: false
    },
    {
      title: 'GaFET: Learning Geometry-aware Facial Expression Translation from In-The-Wild Images',
      authors: 'Ma, Tianxiang; Li, Bingchuan; He, Qian; Dong, Jing; Tan, Tieniu;',
      venue: 'ICCV',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2308.03413',
      widelyApplied: false
    },
    {
      title: 'ED-T2V: An Efficient Training Framework for Diffusion-based Text-to-Video Generation',
      authors: 'Liu, Jiawei; Wang, Weining; Liu, Wei; He, Qian; Liu, Jing;',
      venue: 'IJCNN',
      year: '2023',
      widelyApplied: false
    },
    {
      title: 'Semantic3D: Semantic 3D-aware Image Synthesis and Manipulation Based on Compositional Neural Radiance Field',
      authors: 'Ma, Tianxiang; Li, Bingchuan; He, Qian; Dong, Jing; Tan, Tieniu;',
      venue: 'AAAI',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2302.14163',
      widelyApplied: false
    },
    {
      title: 'ReGANIE: Rectifying GAN Inversion Errors for Accurate Real Image Editing',
      authors: 'Li, Bingchuan; Ma, Tianxiang; Zhang, Peng; Hua, Miao; Liu, Wei; He, Qian; Yi, Zili;',
      venue: 'AAAI',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2303.02994',
      widelyApplied: false
    },
    {
      title: 'CFFT-GAN: Cross-domain Feature Fusion Transformer for Exemplar-based Image Translation',
      authors: 'He, Qian; et al.',
      venue: 'AAAI',
      year: '2023',
      widelyApplied: false
    },
    {
      title: 'DyStyle: Dynamic Neural Network for Multi-Attribute-Conditioned Style Editings',
      authors: 'Li, Bingchuan; Cai, Shaofei; Liu, Wei; Zhang, Peng; He, Qian; Hua, Miao; Liu, Wei; Yi, Zili;',
      venue: 'WACV',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2210.07476',
      widelyApplied: false
    },
    {
      title: 'Hierarchical Region-Aware High-Fidelity Face Swapping',
      authors: 'Xu, Chao; Hua, Miao; He, Qian; et al.',
      venue: 'CVPR',
      year: '2022',
      arxiv: 'https://arxiv.org/abs/2203.13218',
      widelyApplied: false
    },
    {
      title: 'Self-Supervised Cross-Modal Meta-training for Few-Shot Font Generation',
      authors: 'Wei Liu, FangYue Liu, et al.',
      venue: 'CVPR',
      year: '2022',
      arxiv: 'https://arxiv.org/abs/2203.08012',
      widelyApplied: false
    },
    {
      title: 'FaceEraser: Removing Facial Parts for Augmented Reality',
      authors: 'Hua, Miao; Liu, Lijie; Cheng, Ziyang; He, Qian; Li, Bingchuan; Yi, Zili;',
      venue: 'ICCV Workshop',
      year: '2021',
      arxiv: 'https://arxiv.org/abs/2109.10760',
      widelyApplied: false
    },
    {
      title: 'VMix: Improving Text-to-Image Diffusion Model with Cross-Attention Mixing Control',
      authors: 'Wu, Shaojin; Ding, Fei; Huang, Mengqi; Liu, Wei; He, Qian;',
      venue: 'arXiv',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2412.20800',
      widelyApplied: true
    }
  ];

  // Top conferences ranking for sorting
  const venueRank: { [key: string]: number } = {
    'CVPR': 1,
    'ICCV': 2,
    'NeurIPS': 3,
    'ICML': 4,
    'ICLR': 5,
    'AAAI': 6,
    'IJCAI': 7,
    'SIGGRAPH': 8,
    'SIGGRAPH Asia': 9,
    'WACV': 10,
    'IJCNN': 11,
    'CVPR Workshop': 12,
    'ICCV Workshop': 13,
    'arXiv': 14,
  };

  // Sort papers: by venue rank (higher priority first), then by year (newer first), then by widelyApplied (true first)
  const sortedPapers = [...basePapers].sort((a, b) => {
    const rankA = venueRank[a.venue] || 100;
    const rankB = venueRank[b.venue] || 100;
    
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    
    // Same venue, sort by year descending
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);
    if (yearA !== yearB) {
      return yearB - yearA;
    }
    
    // Same venue and year, sort by widelyApplied (true first)
    return (b.widelyApplied ? 1 : 0) - (a.widelyApplied ? 1 : 0);
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
          <div className="card-title">Publications</div>
          <div className="card-value">30+</div>
        </div>
        <div className="card">
          <div className="card-title">Organization</div>
          <div className="card-value" style={{ fontSize: '24px', marginTop: '14px' }}>ByteDance</div>
        </div>
      </section>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {/* Left Column: Open Source Projects */}
        <section className="panel">
          <h2 className="panel-title">Open Source Projects</h2>
          <div className="repo-table-wrapper">
            <table className="repo-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Stars</th>
                </tr>
              </thead>
              <tbody>
                {displayedProjects.map((project, index) => (
                  <tr key={index}>
                    <td>
                      <div className="repo-link">
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          {project.name}
                        </a>
                      </div>
                      <div className="repo-desc">{project.description}</div>
                    </td>
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

        {/* Right Column: Publications */}
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
                  <td style={{ paddingRight: '16px', width: '70px' }}>
                    <div className="year" style={{ marginBottom: '4px' }}>{paper.year}</div>
                    <div className="badge" style={{ display: 'inline-block' }}>{paper.venue}</div>
                  </td>
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
                      {paper.widelyApplied && (
                        <span className="badge" style={{ 
                          backgroundColor: '#dcfce7', 
                          borderColor: '#86efac', 
                          color: '#166534' 
                        }}>
                          Widely Applied
                        </span>
                      )}
                    </div>
                    <div className="meta" style={{ fontSize: '11px' }}>{paper.authors}</div>
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
      </div>

      {/* Footer */}
      <footer className="footer">
        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </footer>
    </div>
  );
}
