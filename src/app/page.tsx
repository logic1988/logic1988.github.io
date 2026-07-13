'use client';

import { useState } from 'react';
import papersData from '@/data/papers.json';
import projectsData from '@/data/projects.json';
import './styles.css';

interface Project {
  name: string;
  description: string;
  url: string;
  stars: number;
  stars_updated_at?: string;
}

interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: string;
  arxiv?: string;
  pdf?: string;
  homepage?: string;
  github?: string;
  huggingface?: string;
  widelyApplied?: boolean;
}

const PAPER_PAGE_COUNT = 4;
const projects = projectsData as Project[];
const papers = papersData as Paper[];
const papersPerPage = Math.ceil(papers.length / PAPER_PAGE_COUNT);

const getLatestStarsUpdatedAt = (items: Project[]) => {
  const dates = items
    .map(project => project.stars_updated_at)
    .filter((date): date is string => Boolean(date))
    .sort((a, b) => b.localeCompare(a));

  return dates[0] ?? 'unknown';
};

export default function Home() {
  const [papersPage, setPapersPage] = useState(1);

  // Sort papers by year, then technical reports, then widely applied work.
  const sortedPapers = [...papers].sort((a, b) => {
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);
    if (yearA !== yearB) {
      return yearB - yearA;
    }

    const isTechnicalA = a.venue === 'Technical Report';
    const isTechnicalB = b.venue === 'Technical Report';

    if (isTechnicalA !== isTechnicalB) {
      return isTechnicalA ? -1 : 1;
    }

    const isWidelyAppliedA = Boolean(a.widelyApplied);
    const isWidelyAppliedB = Boolean(b.widelyApplied);

    if (isWidelyAppliedA !== isWidelyAppliedB) {
      return isWidelyAppliedA ? -1 : 1;
    }

    return 0;
  });

  const sortedProjects = [...projects].sort((a, b) => b.stars - a.stars);

  const totalPapersPages = Math.ceil(sortedPapers.length / papersPerPage);
  const displayedPapers = sortedPapers.slice(
    (papersPage - 1) * papersPerPage,
    papersPage * papersPerPage
  );

  const starsUpdatedAt = getLatestStarsUpdatedAt(sortedProjects);

  const formatStars = (stars: number): string => {
    if (stars >= 1000) {
      return (stars / 1000).toFixed(1) + 'k';
    }
    return stars.toLocaleString();
  };

  return (
    <div className="page">
      <header className="hero">
        <h1><span style={{ fontWeight: 200 }}>HE</span> <span style={{ fontWeight: 200, marginLeft: '4px' }}>QIAN</span></h1>
      </header>

      <section className="stats">
        <div className="card" style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
          <div className="card-title">GitHub Stars</div>
          <div className="card-value">
            {sortedProjects.reduce((sum, p) => sum + p.stars, 0).toLocaleString()}
          </div>
          <div className="card-note">as of {starsUpdatedAt}</div>
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

      <div className="content-grid">
        <section className="panel project-panel">
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
                      {formatStars(project.stars)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel publication-panel">
          <h2 className="panel-title">
            Publications
          </h2>
          <div className="paper-note">
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
              {displayedPapers.map((paper, index) => {
                const paperLinks = [
                  { label: 'arXiv', url: paper.arxiv ?? paper.pdf },
                  { label: 'Project', url: paper.homepage },
                  { label: 'GitHub', url: paper.github },
                  { label: 'HF', url: paper.huggingface },
                ].filter((link): link is { label: string; url: string } => Boolean(link.url));

                return (
                  <tr key={index}>
                    <td style={{ paddingRight: '16px', width: '70px' }}>
                      <div className="year" style={{ marginBottom: '4px' }}>{paper.year}</div>
                      <div className="badge" style={{ display: 'inline-block' }}>{paper.venue}</div>
                    </td>
                    <td>
                      <div className="title-line">
                        <span className="title">{paper.title}</span>
                        {paper.widelyApplied && (
                          <span className="badge" style={{
                            backgroundColor: '#dcfce7',
                            borderColor: '#86efac',
                            color: '#166534'
                          }}>
                            Widely Applied
                          </span>
                        )}
                        {paperLinks.map(link => (
                          <a
                            key={`${paper.title}-${link.label}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="arxiv"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
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
        <a href="mailto:1988heqian@163.com">
          1988heqian@163.com
        </a>
        <span className="dot">•</span>
        <span style={{ fontWeight: 500 }}>© {new Date().getFullYear()} All rights reserved.</span>
      </footer>
    </div>
  );
}
