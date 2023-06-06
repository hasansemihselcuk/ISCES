import React, { useState } from "react";
import ImageMapper from "react-img-mapper";

const Mapper = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const areas = [
    {
      title: "Mimarlık Fakültesi",
      shape: "poly",
      name: "1",
      fillColor: "rgba(0, 128, 0, 0.4)",
      strokeColor: "black",
      coords: [35, 20, 100, 30, 70, 170, 20, 160],
      polygon: [
        [35, 20],
        [100, 30],
        [70, 170],
        [20, 160],
      ],
    },
    {
      title: "MBG",
      shape: "poly",
      name: "2",
      fillColor: "rgba(233, 130, 235, 0.4)",
      strokeColor: "black",
      coords: [165, 140, 160, 176, 234, 185, 240, 150],
      polygon: [
        [165, 140],
        [160, 176],
        [234, 185],
        [240, 150],
      ],
    },
    {
      title: "Matematik Bölümü",
      shape: "poly",
      name: "3",
      fillColor: "rgba(255, 99, 71, 0.4)",
      strokeColor: "black",
      coords: [158, 178, 148, 217, 182, 224, 191, 184],
      polygon: [
        [158, 178],
        [148, 217],
        [182, 224],
        [191, 184],
      ],
    },
    {
      title: "Fizik Bölümü",
      shape: "poly",
      name: "4",
      fillColor: "rgba(49, 33, 235, 0.3)",
      strokeColor: "black",
      coords: [147, 228, 141, 276, 190, 285, 197, 262, 171, 256, 176, 229],
      polygon: [
        [147, 228],
        [141, 276],
        [190, 285],
        [197, 262],
        [171, 256],
        [176, 229],
      ],
    },
    {
      title: "Kimya Bölümü",
      shape: "poly",
      name: "5",
      fillColor: "rgba(255, 255, 27, 0.4)",
      strokeColor: "black",
      coords: [302, 152, 288, 221, 332, 233, 347, 158],
      polygon: [
        [302, 152],
        [288, 221],
        [332, 233],
        [347, 158],
      ],
    },
    {
      title: "Ceng ve Fotonik",
      shape: "poly",
      name: "Bilgisayar Mühendisliği",
      name2: "Fotonik",
      fillColor: "rgba(0, 221, 255, 0.3)",
      strokeColor: "black",
      coords: [539, 320, 532, 362, 574, 376, 581, 329],
      polygon: [
        [539, 320],
        [532, 362],
        [574, 376],
        [581, 329],
      ],
    },
    {
      title: "Kimya Mühendisliği",
      shape: "poly",
      name: "7",
      fillColor: "rgba(139, 0, 0, 0.3)",
      strokeColor: "black",
      coords: [407, 508, 403, 553, 444, 563, 455, 514],
      polygon: [
        [407, 508],

        [403, 553],
        [444, 563],
        [455, 514],
      ],
    },
    {
      title: "EHM ve Malzeme",
      shape: "poly",
      name: "8",
      fillColor: "rgba(0, 255, 103, 0.3)",
      strokeColor: "black",
      coords: [481, 463, 473, 515, 496, 523, 500, 486, 530, 490, 536, 468],
      polygon: [
        [481, 463],
        [473, 515],
        [496, 523],
        [500, 486],
        [530, 490],
        [536, 468],
      ],
    },
    {
      title: "İnşaat Mühendisliği",
      shape: "poly",
      name: "9",
      fillColor: "rgba(143, 73, 30, 0.5)",
      strokeColor: "black",
      coords: [542, 469, 538, 486, 581, 494, 575, 537, 598, 543, 610, 482],
      polygon: [
        [542, 469],
        [538, 486],
        [581, 494],
        [575, 537],
        [598, 543],
        [610, 482],
      ],
    },
    {
      title: "Gıda Mühendisliği,Biyo Mühendislik, Enerji Sistemleri",
      shape: "poly",
      name: "Biyomühendislik",
      fillColor: "rgba(255, 0, 52, 0.3)",
      strokeColor: "black",
      coords: [570, 544, 563, 585, 529, 606, 547, 632, 588, 603, 603, 550],
      polygon: [
        [570, 544],
        [563, 585],
        [529, 606],
        [547, 632],
        [588, 603],
        [603, 550],
      ],
    },
    {
      title: "Makine Mühendisliği",
      shape: "poly",
      name: "11",
      fillColor: "rgba(62, 143, 255, 0.4)",
      strokeColor: "black",
      coords: [518, 593, 540, 633, 497, 663, 467, 618],
      polygon: [
        [518, 593],
        [540, 633],
        [497, 663],
        [467, 618],
      ],
    },
  ];

  const [selectedArea, setSelectedArea] = useState(null);

  const handleAreaClick = (area) => {
    console.log("Tıklanan Bölge:", area.name);
    setSelectedArea(area);
  };

  const renderCandidateInfo = () => {
    if (selectedArea) {
      const candidates = {
        status: "success",
        results: 9,
        data: {
          candidates: [
            {
              name: "Fatma",
              surname: "Yılmaz",
              department: "Biyomühendislik",
              voteCount: 0,
            },
            {
              name: "Mehmet",
              surname: "Kaya",
              department: "Bilgisayar Mühendisliği",
              voteCount: 8,
            },
            {
              name: "Emre",
              surname: "Demir",
              department: "Bilgisayar Mühendisliği",
              voteCount: 2,
            },
            {
              name: "Mehmet",
              surname: "Aydın",
              department: "Biyomühendislik",
              voteCount: 0,
            },
            {
              name: "Selin",
              surname: "Aydın",
              department: "Bilgisayar Mühendisliği",
              voteCount: 3,
            },
            {
              name: "XXelin",
              surname: "XXAydın",
              department: "Fotonik",
              voteCount: 3,
            },
            {
              name: "Emir",
              surname: "Demir",
              department: "Biyomühendislik",
              voteCount: 0,
            },
            {
              name: "Ayşe",
              surname: "Yılmaz",
              department: "Bilgisayar Mühendisliği",
              voteCount: 1,
            },
            {
              name: "Burak",
              surname: "Yıldız",
              department: "Bilgisayar Mühendisliği",
              voteCount: 2,
            },
            {
              name: "Gül",
              surname: "Aydın",
              department: "Biyomühendislik",
              voteCount: 0,
            },
          ],
        },
      };

      const candidateInfo = candidates.data.candidates.filter(
        (candidate) =>
          candidate.department === selectedArea.name ||
          candidate.department === selectedArea.name2
      );

      if (candidateInfo.length > 0) {
        return (
          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {candidateInfo.map((candidate, index) => (
              <div className="bg-white w-auto h-auto relative z-50" key={index}>
                <h3>
                  {candidate.name} {candidate.surname}
                </h3>
                <p>{candidate.department}</p>
                <p>Oy Sayısı: {candidate.voteCount}</p>
              </div>
            ))}
          </div>
        );
      }

      return null;
    }

    return null;
  };

  return (
    <div className="flex justify-center mt-20 ml-20 w-full max-w-full h-auto">
      <div className="">
        <ImageMapper
          src={props.image}
          map={{
            name: "my-map",
            areas: areas,
          }}
          width={800}
          height={800}
          alt="myImage"
          role="presentation"
          className="img-mapper-img"
          onClick={handleAreaClick}
        />
        {renderCandidateInfo()}
      </div>
    </div>
  );
};

export default Mapper;
