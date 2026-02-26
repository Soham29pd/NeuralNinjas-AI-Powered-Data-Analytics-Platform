import React from 'react';

const TopPostsTable = ({ posts }) => {
  return (
    <div className="chart-card full-width">
      <h3 style={{ marginBottom: '1.5rem' }}>Top Performing Content</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
          <thead>
            <tr style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'left' }}>
              <th style={{ padding: '0 1rem' }}>Content</th>
              <th>Platform</th>
              <th>Likes</th>
              <th>Retweets</th>
              <th>Engagement</th>
              <th>Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {posts.slice(0, 5).map((post, index) => (
              <tr key={index} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <td style={{ padding: '1.2rem 1rem', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {post.Text}
                </td>
                <td style={{ color: '#818cf8' }}>{post.Platform}</td>
                <td>{post.Likes}</td>
                <td>{post.Retweets}</td>
                <td style={{ fontWeight: 'bold' }}>{post.Total_Engagement}</td>
                <td>
                  <span style={{ 
                    color: post.Sentiment_Score > 0 ? '#4ade80' : '#f87171',
                    background: post.Sentiment_Score > 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>
                    {post.Sentiment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPostsTable;