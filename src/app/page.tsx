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
  stars: number;
}

interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: string;
  arxiv?: string;
  pdf?: string;
  widelyApplied?: boolean;
}

const PAPERS_PER_PAGE = 9;

export default function Home() {
  const [githubRepos, setGithubRepos] = useState<Map<string, GitHubRepo>>(new Map());
  const [papersPage, setPapersPage] = useState(1);

  const baseProjects: Project[] = [
    {
      name: 'PuLID',
      description: '人物ID保持插件',
      url: 'https://github.com/ToTheBeginning/PuLID',
      stars: 3500
    },
    {
      name: 'DreamO',
      description: '图像一致性',
      url: 'https://github.com/bytedance/DreamO',
      stars: 1700
    },
    {
      name: 'Phantom',
      description: '视频一致性',
      url: 'https://github.com/Phantom-video/Phantom',
      stars: 1500
    },
    {
      name: 'UNO',
      description: '一致性合成数据链路',
      url: 'https://github.com/bytedance/UNO',
      stars: 1400
    },
    {
      name: 'USO',
      description: '风格化一致性生成',
      url: 'https://github.com/bytedance/USO',
      stars: 1200
    },
    {
      name: 'Humo',
      description: '多模态人物视频生成',
      url: 'https://github.com/phantom-video/humo',
      stars: 1200
    },
    {
      name: 'DreamID-V',
      description: '视频换脸',
      url: 'https://github.com/bytedance/DreamID-V',
      stars: 563
    },
    {
      name: 'HyperLora',
      description: '图像ID lora优化',
      url: 'https://github.com/bytedance/ComfyUI-HyperLoRA',
      stars: 486
    },
    {
      name: 'RealCustom',
      description: 'IP保持',
      url: 'https://github.com/bytedance/RealCustom',
      stars: 100
    },
    {
      name: 'DreamID',
      description: '图片换脸',
      url: 'https://github.com/superhero-7/DreamID',
      stars: 105
    },
    {
      name: 'I2VControl',
      description: '视频运动运镜控制',
      url: 'https://github.com/WanquanF/I2VControl-Camera',
      stars: 114
    }
  ];

  const basePapers: Paper[] = [
    {
      title: 'DreamStyle: A Unified Framework for Video Stylization',
      authors: 'He Qian et al.',
      venue: 'CVPR',
      year: '2026',
      arxiv: 'https://arxiv.org/abs/2601.02785',
      widelyApplied: false
    },
    {
      title: 'Scaling4D: Pushing the Frontier of Video Novel View Synthesis through Large-Scale Monocular Videos',
      authors: 'He Qian et al.',
      venue: 'CVPR',
      year: '2026',
      widelyApplied: false
    },
    {
      title: 'OmniTransfer: All-in-one Framework for Spatio-temporal Video Transfer',
      authors: 'He Qian et al.',
      venue: 'CVPR',
      year: '2026',
      arxiv: 'https://arxiv.org/abs/2601.14250',
      widelyApplied: true
    },
    {
      title: 'USO: Unified Style and Subject-Driven Generation via Disentangled and Reward Learning',
      authors: 'He Qian et al.',
      venue: 'CVPR',
      year: '2026',
      arxiv: 'https://arxiv.org/abs/2508.18966',
      widelyApplied: false
    },
    {
      title: 'UMO: Scaling Multi-Identity Consistency for Image Customization via Matching Reward',
      authors: 'Cheng Yufeng Wu Wenxu Wu Shaojin Huang Mengqi Ding Fei He Qian',
      venue: 'CVPR',
      year: '2026',
      arxiv: 'https://arxiv.org/abs/2509.06818',
      widelyApplied: false
    },
    {
      title: 'Phantom-Data: Towards a General Subject-Consistent Video Generation Dataset',
      authors: 'Chen Zhuowei Li Bingchuan Ma Tianxiang Liu Lijie Liu Mingcong Zhang Yi Li Gen Li Xinghui Zhou Siyu He Qian',
      venue: 'ICLR',
      year: '2026',
      arxiv: 'https://arxiv.org/abs/2506.18851',
      widelyApplied: true
    },
    {
      title: 'HuMo: Human-Centric Video Generation via Collaborative Multi-Modal Conditioning',
      authors: 'Chen Liyang Ma Tianxiang Liu Jiawei Li Bingchuan Chen Zhuowei Liu Lijie He Xu Li Gen He Qian Wu Zhiyong',
      venue: 'AAAI',
      year: '2026',
      arxiv: 'https://arxiv.org/abs/2509.08519',
      widelyApplied: true
    },
    {
      title: 'I2VControl-Camera: Precise Video Camera Control with Adjustable Motion Strength',
      authors: 'Feng Wanquan Liu Jiawei Tu Pengqi Qi Tianhao Sun Mingzhen Ma Tianxiang Zhao Songtao Zhou Siyu He Qian',
      venue: 'ICLR',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2411.06525',
      widelyApplied: false
    },
    {
      title: 'HyperLora: Parameter-Efficient Adaptive Generation for Portrait Synthesis',
      authors: 'He Qian et al.',
      venue: 'CVPR',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2503.16944',
      widelyApplied: false
    },
    {
      title: 'AnyDressing: Customizable Multi-Garment Virtual Dressing via Latent Diffusion Models',
      authors: 'Li Xinghui Sun Qichao Zhang Pengze Ye Fulong Liao Zhichao Feng Wanquan Zhao Songtao He Qian',
      venue: 'CVPR',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2412.04146',
      widelyApplied: false
    },
    {
      title: 'AR-Diffusion: Asynchronous Video Generation with Auto-Regressive Diffusion',
      authors: 'Sun Mingzhen Wang Weining Li Gen Liu Jiawei Sun Jiahui Feng Wanquan Lao Shanshan Zhou SiYu He Qian Liu Jing',
      venue: 'CVPR',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2503.07418',
      widelyApplied: false
    },
    {
      title: 'Mask^2DiT: Dual Mask-based Diffusion Transformer for Multi-Scene Long Video Generation',
      authors: 'He Qian et al.',
      venue: 'CVPR',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2503.19881',
      widelyApplied: false
    },
    {
      title: 'I2VControl: Disentangled and Unified Video Motion Synthesis Control',
      authors: 'Feng Wanquan Qi Tianhao Liu Jiawei Sun Mingzhen Tu Pengqi Ma Tianxiang Dai Fei Zhao Songtao Zhou Siyu He Qian',
      venue: 'ICCV',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2411.17765',
      widelyApplied: true
    },
    {
      title: 'Less-to-More Generalization: Unlocking More Controllability by In-Context Generation',
      authors: 'He Qian et al.',
      venue: 'ICCV',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2504.02160',
      widelyApplied: false
    },
    {
      title: 'OneGT: One-Shot Geometry-Texture Neural Rendering for Head Avatars',
      authors: 'He Qian et al.',
      venue: 'ICCV',
      year: '2025',
      pdf: 'https://openaccess.thecvf.com/content/ICCV2025/papers/Chen_OneGT_One-Shot_Geometry-Texture_Neural_Rendering_for_Head_Avatars_ICCV_2025_paper.pdf',
      widelyApplied: false
    },
    {
      title: 'Phantom: Subject-Consistent Video Generation via Cross-Modal Alignment',
      authors: 'Liu Lijie Ma Tianxiang Li Bingchuan Chen Zhuowei Liu Jiawei Li Gen Zhou Siyu He Qian Wu Xinglong',
      venue: 'ICCV',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2502.11079',
      widelyApplied: true
    },
    {
      title: 'DreamO: A Unified Framework for Image Customization',
      authors: 'Mou Chong Wu Yanze Wu Wenxu Guo Zinan Zhang Pengze Cheng Yufeng Luo Yiming Ding Fei Zhang Shiwen Li Xinghui',
      venue: 'SIGGRAPH Asia',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2504.16915',
      widelyApplied: true
    },
    {
      title: 'DreamID: A Fast and High-Fidelity diffusion-based Face Swapping via Triplet ID Group Learning',
      authors: 'Li Xinghui Sun Qichao Zhang Pengze Ye Fulong Liao Zhichao Feng Wanquan Zhao Songtao Sun Mingzhen Hua Miao Zhang Pengze Li Xinghui He Qian Wu Xinglong',
      venue: 'SIGGRAPH Asia',
      year: '2025',
      arxiv: 'https://arxiv.org/abs/2504.14509',
      widelyApplied: true
    },
    {
      title: 'PuLID: Pure and Lightning ID Customization via Contrastive Alignment',
      authors: 'Guo Zinan Wu Yanze Zhuowei Chen Zhang Peng He Qian',
      venue: 'NeurIPS',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2404.16022',
      widelyApplied: true
    },
    {
      title: 'RealCustom: Narrowing Real Text Word for Real-Time Open-Domain Text-to-Image Customization',
      authors: 'Huang Mengqi Mao Zhendong Liu Mingcong He Qian Zhang Yongdong',
      venue: 'CVPR',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2405.04741',
      widelyApplied: false
    },
    {
      title: 'Deadiff: An Efficient Stylization Diffusion Model with Disentangled Representations',
      authors: 'Qi Tianhao Fang Shancheng Wu Yanze Xie Hongtao Liu Jiawei Chen Lang He Qian Zhang Yongdong',
      venue: 'CVPR',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2403.06951',
      widelyApplied: false
    },
    {
      title: 'DreamIdentity: Enhanced Editability for Efficient Face-identity Preserved Image Generation',
      authors: 'Chen Zhuowei Fang Shancheng Liu Wei He Qian Huang Mengqi Mao Zhendong Zhang Yongdong',
      venue: 'AAAI',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2405.09889',
      widelyApplied: false
    },
    {
      title: 'Customize Your Own Paired Data via Few-shot Way',
      authors: 'Chen Jinshu Li Bingchuan Hua Miao Xu Panpan He Qian',
      venue: 'CVPR Workshop',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2405.12490',
      widelyApplied: false
    },
    {
      title: 'RealCustom++: Representing Images as Real Text Word for Real-Time Customization',
      authors: 'Mao Zhendong Huang Mengqi Ding Fei Liu Mingcong He Qian Zhang Yongdong',
      venue: 'arXiv',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2408.09744',
      widelyApplied: false
    },
    {
      title: 'VMix: Improving Text-to-Image Diffusion Model with Cross-Attention Mixing Control',
      authors: 'Wu Shaojin Ding Fei Huang Mengqi Liu Wei He Qian',
      venue: 'arXiv',
      year: '2024',
      arxiv: 'https://arxiv.org/abs/2412.20800',
      widelyApplied: true
    },
    {
      title: 'UGC: Unified GAN Compression for Efficient Image-to-Image Translation',
      authors: 'Ren Yuxi Wu Jie Zhang Peng Zhang Manlin Xiao Xuefeng He Qian Wang Rui Zheng Min Pan Xin',
      venue: 'ICCV',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2309.09310',
      widelyApplied: false
    },
    {
      title: 'GaFET: Learning Geometry-aware Facial Expression Translation from In-The-Wild Images',
      authors: 'Ma Tianxiang Li Bingchuan He Qian Dong Jing Tan Tieniu',
      venue: 'ICCV',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2308.03413',
      widelyApplied: false
    },
    {
      title: 'ED-T2V: An Efficient Training Framework for Diffusion-based Text-to-Video Generation',
      authors: 'Liu Jiawei Wang Weining Liu Wei He Qian Liu Jing',
      venue: 'IJCNN',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2309.06818',
      widelyApplied: false
    },
    {
      title: 'Semantic3D: Semantic 3D-aware Image Synthesis and Manipulation Based on Compositional Neural Radiance Field',
      authors: 'Ma Tianxiang Li Bingchuan He Qian Dong Jing Tan Tieniu',
      venue: 'AAAI',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2302.14163',
      widelyApplied: false
    },
    {
      title: 'ReGANIE: Rectifying GAN Inversion Errors for Accurate Real Image Editing',
      authors: 'Li Bingchuan Ma Tianxiang Zhang Peng Hua Miao Liu Wei He Qian Yi Zili',
      venue: 'AAAI',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2303.02994',
      widelyApplied: false
    },
    {
      title: 'CFFT-GAN: Cross-domain Feature Fusion Transformer for Exemplar-based Image Translation',
      authors: 'He Qian et al.',
      venue: 'AAAI',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2309.06818',
      widelyApplied: false
    },
    {
      title: 'DyStyle: Dynamic Neural Network for Multi-Attribute-Conditioned Style Editings',
      authors: 'Li Bingchuan Cai Shaofei Liu Wei Zhang Peng He Qian Hua Miao Liu Wei Yi Zili',
      venue: 'WACV',
      year: '2023',
      arxiv: 'https://arxiv.org/abs/2210.07476',
      widelyApplied: false
    },
    {
      title: 'Hierarchical Region-Aware High-Fidelity Face Swapping',
      authors: 'Xu Chao Hua Miao He Qian et al.',
      venue: 'CVPR',
      year: '2022',
      arxiv: 'https://arxiv.org/abs/2203.13218',
      widelyApplied: false
    },
    {
      title: 'Self-Supervised Cross-Modal Meta-training for Few-Shot Font Generation',
      authors: 'Wei Liu FangYue Liu et al.',
      venue: 'CVPR',
      year: '2022',
      arxiv: 'https://arxiv.org/abs/2203.08012',
      widelyApplied: false
    },
    {
      title: 'FaceEraser: Removing Facial Parts for Augmented Reality',
      authors: 'Hua Miao Liu Lijie Cheng Ziyang He Qian Li Bingchuan Yi Zili',
      venue: 'ICCV Workshop',
      year: '2021',
      arxiv: 'https://arxiv.org/abs/2109.10760',
      widelyApplied: false
    }
  ];

  // Sort papers: year descending > 2 tags > 1 tag (with Scale) > 0 tags
  const sortedPapers = [...basePapers].sort((a, b) => {
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);
    if (yearA !== yearB) {
      return yearB - yearA;
    }

    const getTagCount = (paper: Paper) => {
      let count = 1;
      if (paper.arxiv) count++;
      if (paper.widelyApplied) count++;
      return count;
    };

    const tagsA = getTagCount(a);
    const tagsB = getTagCount(b);

    if (tagsA !== tagsB) {
      return tagsB - tagsA;
    }

    const isScaleVenue = (venue: string) => ['CVPR', 'ICCV', 'NeurIPS', 'ICLR', 'AAAI'].includes(venue);
    const isScaleA = isScaleVenue(a.venue);
    const isScaleB = isScaleVenue(b.venue);

    if (isScaleA !== isScaleB) {
      return isScaleA ? -1 : 1;
    }

    return 0;
  });

  useEffect(() => {
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

  const getProjectStars = (project: Project): number => {
    const repo = githubRepos.get(project.url);
    if (repo) {
      return repo.stars;
    }
    return typeof project.stars === 'number' ? project.stars : 0;
  };

  const sortedProjects = [...baseProjects].sort((a, b) => {
    const starsA = getProjectStars(a);
    const starsB = getProjectStars(b);
    return starsB - starsA;
  });

  const totalPapersPages = Math.ceil(sortedPapers.length / PAPERS_PER_PAGE);
  const displayedPapers = sortedPapers.slice(
    (papersPage - 1) * PAPERS_PER_PAGE,
    papersPage * PAPERS_PER_PAGE
  );

  const currentDate = new Date().toISOString().split('T')[0];

  const formatStars = (stars: number): string => {
    if (stars >= 1000) {
      return (stars / 1000).toFixed(1) + 'k';
    }
    return stars.toLocaleString();
  };

  return (
    <div className="page">
      <header className="hero">
        <h1><span style={{ fontWeight: 400 }}>HE</span> Qian</h1>
      </header>

      <section className="stats">
        <div className="card" style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
          <div className="card-title">GitHub Stars</div>
          <div className="card-value">
            {sortedProjects.reduce((sum, p) => sum + getProjectStars(p), 0).toLocaleString()}
          </div>
          <div className="card-note">as of {currentDate}</div>
        </div>
        <div className="card" style={{ '--accent': '#10b981' } as React.CSSProperties}>
          <div className="card-title">Projects</div>
          <div className="card-value">{sortedProjects.length}</div>
          <div className="card-note">selected projects</div>
        </div>
        <div className="card" style={{ '--accent': '#f97316' } as React.CSSProperties}>
          <div className="card-title">Publications</div>
          <div className="card-value">{sortedPapers.length}+</div>
          <div className="card-note">from 2021-2026</div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '20px' }}>
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
                {sortedProjects.map((project, index) => (
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
                      {formatStars(getProjectStars(project))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-title">
            Publications
          </h2>
          <div style={{ 
            marginBottom: '16px', 
            fontSize: '11px', 
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            color: '#8a90a1',
            paddingBottom: '8px',
            borderBottom: '1px solid #e5e7ee'
          }}>
            For complete article list, see{' '}
            <a 
              href="https://scholar.google.com/citations?hl=zh-CN&user=9rWWCgUAAAAJ&view_op=list_works&sortby=pubdate"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#8a90a1', textDecoration: 'none', fontWeight: 600 }}
            >
              Google Scholar
            </a>
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
                      {paper.pdf && (
                        <a 
                          href={paper.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="arxiv"
                        >
                          pdf
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

      <footer className="footer">
        <a href="mailto:1988heqian@163.com" style={{ color: '#4c5363', textDecoration: 'none', fontWeight: 500 }}>
          1988heqian@163.com
        </a>
        <span className="dot">•</span>
        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </footer>
    </div>
  );
}
