import React, { useEffect, useState } from "react";
import ImageMapper from "react-img-mapper";
import axios from "axios";

const Mapper = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState(null);

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
      name: "Mimarlık",
      name2: "Şehir ve Bölge Planlama",
      name3: "Endüstriyel Tasarım",
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
      name: "Moleküler Biyoloji ve Genetik",
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
      name: "Matematik",
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
      name: "Fizik",
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
      name: "Kimya",
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
      name: "Kimya Mühendisliği",
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
      name: "Elektronik ve Haberleşme Mühendisliği",
      name2: "Malzeme Bilimi ve Mühendisliği",
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
      name: "İnşaat Mühendisliği",
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
      name2: "Gıda Mühendisliği",
      name3: "Enerji Sistemleri Mühendisliği",
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
      name: "Makine Mühendisliği",
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

  const handleAreaClick = async (area) => {
    console.log("Tıklanan Bölge:", area.name);
    const res = await axios.get("http://localhost:3001/api/v1/map/");
    const candidates = res.data.data.candidates;
    const filteredCandidates = candidates.filter(
      (candidate) =>
        candidate.department === area.name ||
        candidate.department === area.name2 ||
        candidate.department === area.name3
    );
    if (filteredCandidates.length > 0) {
      console.log("Aday bulundu");
      setCandidateInfo(filteredCandidates);
    } else {
      console.log("Aday bulunamadı");
    }
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
        {candidateInfo && candidateInfo.length > 0 ? (
          <div className="grid gap-4 grid-cols-3  p-4 rounded-lg">
            {candidateInfo.map((candidate, index) => (
              <div
                className="bg-white w-auto h-auto relative z-50 rounded-lg p-4"
                key={index}
              >
                <h3 className="text-xl font-bold">
                  {candidate.name} {candidate.surname}
                </h3>
                <p>{candidate.department}</p>
                <p>Oy Sayısı: {candidate.voteCount}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Mapper;
