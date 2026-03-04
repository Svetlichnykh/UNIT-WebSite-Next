import special_motel from "@/assets/images/special-motel.jpg";
import special_house from "@/assets/images/special-house.jpg";
import special_pension from "@/assets/images/special-pension.jpg";
import special_medicine from "@/assets/images/special-medicine.jpg";
import special_duplex from "@/assets/images/special-duplex.jpg";

export const projectsData = [
  {
    id: 1,
    project_name: "Гостиница",
    project_img: special_motel,
    project_desc:
      "Продуманная планировка на 36–38 номеров позволяет быстро запустить доходный объект для туристических потоков, командировок или баз отдыха.",
    client: "36–38 номеров",
    area: "2 этажа",
    project_year: "910 м²",
    project_type: "Гостиничный бизнес",
    link: "/project-single",
  },

  {
    id: 2,
    project_name: "Многоквартирный дом",
    project_img: special_house,
    project_desc:
      "Оптимальное решение для малоэтажной застройки: позволяет эффективно использовать землю и запускать продажи или аренду уже на этапе строительства.",
    client: "18 квартир",
    area: "3 этажа",
    project_year: "476 м²",
    project_type: "Девелопмент",
    link: "/project-single",
  },

  {
    id: 3,
    project_name: "Пансионат",
    project_img: special_pension,
    project_desc:
      "Подходит для создания частного дома ухода, реабилитационного центра или социального объекта с оптимальными затратами на строительство.",
    client: "6 комнат",
    area: "1 этаж",
    project_year: "163 м²",
    project_type: "Социальное",
    link: "/project-single",
  },

  {
    id: 4,
    project_name: "Фельдшерско-акушерский пункт",
    project_img: special_medicine,
    project_desc:
      "Функциональное решение для обеспечения доступной медицины в малых населённых пунктах в рамках государственных и муниципальных программ.",
    client: "6 кабинетов",
    area: "1 этаж",
    project_year: "69 м²",
    project_type: "Социальное",
    link: "/project-single",
  },

  {
    id: 5,
    project_name: "Дуплекс",
    project_img: special_duplex,
    project_desc:
      "Идеально подходит для туристических комплексов, арендного бизнеса или точечной застройки частного сектора.",
    client: "2 квартиры",
    area: "1 этаж",
    project_year: "59 м²",
    project_type: "Туризм / арендный бизнес",
    link: "/project-single",
  },
];
