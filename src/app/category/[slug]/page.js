import Feedback from "@/components/section/feedback";
import BannerThree from "@/components/section/heroes/bannerThree";
import SectionTitle from "@/components/ui/sectionTitle";
import ProjectCardOne from "@/components/ui/cards/projectCardOne";
import {
  cardSlideAnimation,
  cardSlideAnimationDelay,
  cardSlideAnimationRight,
  cardSlideAnimationRightDelay,
} from "@/lib/utils";

export const metadata = {
  title: "Architronix -- Home-1",
  description: "Architronix is a next js and tailwind css website",
};

import { notFound } from "next/navigation";
import { Categories } from "@/data/categories";

export function generateStaticParams() {
  return Object.keys(Categories).map((slug) => ({ slug }));
}

export default async function Home3({ params }) {
  const { slug } = await params;

  const data = Categories[slug];

  if (!data) {
    notFound();
  }

  return (
    <>
      <BannerThree text={data.title} />
      <section>
        <div className="container-fluid ">
          <SectionTitle
            sectionName={"Монтаж"}
            sectionTitle={"Монтаж любого дома до 10 дней"}
            sectionDesc={[
              "Нет стройки на участке",
              "30+ специалистов в штате",
              "10 этапов контроля качества",
              "25 лет гарантии",
            ]}
          />
        </div>
        <div className="lg:pt-30 2sm:pt-20 pt-14">
          <div className="">
            {data?.houses.map(
              ({
                id,
                project_desc,
                project_img,
                project_name,
                project_area,
                project_bedrooms,
                project_price,
                link,
              }) => {
                if (id % 2 === 0) {
                  return (
                    <ProjectCardOne
                      key={id}
                      project_desc={project_desc}
                      project_img={project_img}
                      project_bedrooms={project_bedrooms}
                      project_price={project_price}
                      project_area={project_area}
                      link={link}
                      project_name={project_name}
                      order={"lg:order-1 order-0"}
                      position={
                        "lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
                      }
                      imageVariants={cardSlideAnimationRight()}
                      cardVariants={cardSlideAnimationRightDelay()}
                    />
                  );
                } else {
                  return (
                    <ProjectCardOne
                      key={id}
                      project_desc={project_desc}
                      project_img={project_img}
                      project_bedrooms={project_bedrooms}
                      project_price={project_price}
                      project_area={project_area}
                      link={link}
                      project_name={project_name}
                      position={
                        "lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2"
                      }
                      imageVariants={cardSlideAnimation()}
                      cardVariants={cardSlideAnimationDelay()}
                    />
                  );
                }
              },
            )}
          </div>
        </div>
      </section>

      <Feedback />
    </>
  );
}
