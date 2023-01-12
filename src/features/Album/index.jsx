import React from 'react';

import AlbumList from '../Album/components/AlbumList';

const AlbumFeature = (props) => {
  const albumList = [
    {
      id: 1,
      name: 'Nhạc Cho Thứ Ba',
      thumbnailImg:
        'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/c/1/0/c/c10c1cdca2c3c315e65c91ed5cd847d3.jpg',
    },
    {
      id: 2,
      name: 'Bộ 3 Kết Hợp',
      thumbnailImg:
        'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/e/3/5/b/e35bed6fbbc00ea6383599c8b0f5da81.jpg',
    },
    {
      id: 3,
      name: '100 Top Hits',
      thumbnailImg:
        'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/8/4/4/e/844e178586a44e4cf755ebfe60feadc5.jpg',
    },
  ];
  return (
    <div>
      <AlbumList albumList={albumList} />
    </div>
  );
};

export default AlbumFeature;
