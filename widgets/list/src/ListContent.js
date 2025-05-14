import React, { useEffect, useState } from 'react';

const MAX_ROWS = 34;
const ROWS_PER_PAGE = 17;  // Split into two pages
const DEFAULT_ROTATION = 10;
const FADE_DURATION = 400;  // milliseconds for fade transition

const migrateLegacyData = data => {
  if (data && data.tables) return data;

  if (data && Array.isArray(data.list)) {
    return {
      ...data,
      rotationSec:
        data.rotationSec !== undefined ? data.rotationSec : DEFAULT_ROTATION,
      tables: [
        {
          title: data.title || '',
          people: data.list.slice(0, MAX_ROWS).map(({ text = '', label = '' }, i) => ({
            apt: i + 1,
            name: text,
            missing: label || ''
          }))
        }
      ]
    };
  }

  return {
    rotationSec: DEFAULT_ROTATION,
    tables: []
  };
};

const ListContent = ({ data: rawData = {} }) => {
  const data = migrateLegacyData(rawData);

  const {
    tables = [],
    rotationSec = DEFAULT_ROTATION,
    color = '#34495e',
    textColor = '#ffffff'
  } = data;

  const [activeTable, setActiveTable] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (rotationSec <= 0) return;

    const switchPage = async () => {
      // Fade out
      setIsVisible(false);
      await new Promise(resolve => setTimeout(resolve, FADE_DURATION));

      // Switch page/table
      if (activePage === 1) {
        setActivePage(0);
        setActiveTable((activeTable + 1) % tables.length);
      } else {
        setActivePage(1);
      }

      // Fade in
      setIsVisible(true);
    };

    const interval = setInterval(switchPage, rotationSec * 1000);
    return () => clearInterval(interval);
  }, [rotationSec, tables.length, activeTable, activePage]);

  if (!tables.length) return null;
  
  const { title = '', people = [] } = tables[activeTable];
  const displayPeople = people.slice(
    activePage * ROWS_PER_PAGE,
    (activePage + 1) * ROWS_PER_PAGE
  );

  return (
    <div className="list-widget">
      {title && (
        <h2 className="table-title">
          {title}
        </h2>
      )}
      <div className={`table-wrapper ${isVisible ? 'visible' : 'hidden'}`}>
        <table>
          <thead>
            <tr>
              <th className="number-header">דירה מס׳</th>
              <th className="name-header">שם</th>
              <th className="status-header">חודשים חסרים</th>
            </tr>
          </thead>
          <tbody>
            {displayPeople.map(person => (
              <tr key={person.apt}>
                <td className="number-cell">{person.apt}</td>
                <td className="name-cell">{person.name || '—'}</td>
                <td className={`status-cell ${person.missing ? 'missing' : 'paid'}`}>
                  {person.missing || '✔'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .list-widget {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          background: ${color};
          color: ${textColor};
          font-family: 'Open Sans', sans-serif;
          padding: 12px;
          box-sizing: border-box;
          direction: rtl;
        }

        .table-title {
          text-align: center;
          margin: 0 0 8px 0;
          font-size: min(28px, 4vh);
          font-weight: 700;
          height: 36px;
        }

        .table-wrapper {
          flex: 1;
          transition: opacity ${FADE_DURATION}ms ease-in-out;
        }

        .table-wrapper.visible {
          opacity: 1;
        }

        .table-wrapper.hidden {
          opacity: 0;
        }

        table {
          width: 100%;
          height: calc(100% - 8px);
          border-collapse: collapse;
          font-size: min(16px, 2.2vh);
        }

        th {
          background: rgba(255, 255, 255, 0.15);
          padding: 8px;
          font-weight: 600;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        td {
          padding: 6px 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        /* Column widths */
        .number-header, .number-cell {
          width: 15%;
        }

        .name-header, .name-cell {
          width: 45%;
        }

        .status-header, .status-cell {
          width: 40%;
        }

        /* Alternating row colors */
        tr:nth-child(even) {
          background: rgba(255, 255, 255, 0.05);
        }

        /* Status colors */
        .missing {
          background: rgba(255, 59, 59, 0.4) !important;
        }

        .paid {
          background: rgba(46, 204, 113, 0.4) !important;
        }

        /* Keep text on one line with ellipsis */
        td {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        tbody tr {
          height: calc((100% - 40px) / ${ROWS_PER_PAGE});
        }
      `}</style>
    </div>
  );
};

export default ListContent;
