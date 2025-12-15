"use client"
import about_img from "@/assets/images/about-image.jpg"
import SectionTitle from '../../ui/sectionTitle'
import { cn } from '@/lib/utils'
import { useInView } from 'react-intersection-observer'
import SectionSidebarImg from '@/components/ui/sectionSidebarImg'

const aboutList = [
    {
        id: "01",
        item: "Выбираем участок и проект",
        item_desc: "Поможем подобрать подходящий участок, проверим его юридическую безопасность и подготовим документы"
    },
    {
        id: "02",
        item: "Фундамент и сети",
        item_desc: "Подберем подрядчика от забора и монтажа фундамента до скважины"
    },
    {
        id: "03",
        item: "Монтаж и отделка",
        item_desc: "Собственное производство домов, а также сборка прямо на Вашем участке"
    },
    {
        id: "04",
        item: "Отмечаете новоселье",
        item_desc: "Поможем с регистрацией дома, бесплатно дадим 2 года сервисного обслуживания и скидки от компаний-партнеров"
    },

]
const AboutOne = ({ text_muted, bg_muted }) => {
    const { ref, inView  } = useInView({
        threshold: 0.00,
        triggerOnce: true
    });
    return (
        <section className='pt-20'>
            <div className='container-fluid '>
                <SectionTitle sectionName={"Зачем"} sectionTitle={"Зачем строить свой дом?"} sectionDesc={"Если просто можно купить готовый"} text_muted={text_muted} bg_muted={bg_muted} />
                <div className={cn(`bg-secondary xl:mt-[220px] lg:mt-25 md:mt-44 mt-[540px] xl:mb-20 mb-0 ${bg_muted}`)}>
                    <div className='container'>
                        <div className='flex lg:flex-row flex-col items-center gap-[66px]'>
                            <SectionSidebarImg img={about_img} section_name={"about-bg"} className="md:-mt-25 -mt-[470px] -mb-25"/>
                            <ul className='lg:mt-0 mt-20 lg:pb-0 pb-10'>
                                {
                                    aboutList.map(({ id, item, item_desc }) => {
                                        return (
                                            <li key={id} className='lg:flex gap-10 pb-10 last:pb-0 justify-between'>
                                                <svg ref={ref} strokeWidth="1" className={`h-[65px] w-20 relative -top-2 left-3 xl:text-6xl text-5xl mb-3 lg:mb-0 inline-block font-extrabold leading-120 text-primary-foreground ${inView ? "animate-text-line-animation stroke-primary stroke-dasharray-1000 stroke-dashoffset-1000" : " fill-transparent stroke-primary "}`}><text className={"font-[family-name:var(--family)] text-primary-foreground"} x="0%" dominantBaseline="middle" y="70%">{id}</text></svg>
                                                <div className='max-w-[534px]'>
                                                    <h4 className='text-3xl 2sm:text-4xl font-bold leading-135 text-primary-foreground '>{item}</h4>
                                                    <p className='text-lg text-primary-foreground font-normal'>{item_desc}</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutOne