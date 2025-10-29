import { getPayload } from 'payload'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import './styles.css'
import HeaderEffect from '@/components/HeaderEffect'
import ArrowOutwardIcon from '@/assets/ArrowOutwardIcon'
import { getMediaUrl } from '@/utils/getMediaUrl'
import Link from 'next/link'
import Socials from '@/components/Socials'
import ThemeSwitch from '@/components/ThemeSwitch'
import ImageComp from '@/components/Image'

export const revalidate = 2592000

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [information, projects, experience] = await Promise.all([
    payload.findGlobal({ slug: 'information' }),
    payload.find({ collection: 'projects' }),
    payload.find({ collection: 'experience' }),
  ])

  return (
    <main className="flex flex-col w-full gap-4 lg:flex-row min-h-dvh max-w-7xl mx-auto px-6 md:px-12 lg:px-24 max-lg:overflow-x-hidden">
      <header className="flex flex-col justify-between lg:sticky top-0 py-6 sm:py-12 lg:py-20 lg:h-screen lg:w-1/2">
        <div className="flex flex-col gap-3 sm:gap-4">
          <HeaderEffect />
          <h1 className="text-[2.4rem] sm:text-[2.8rem] font-bold">{information?.name}</h1>
          <h2 className="text-[1rem] sm:text-[1.3rem] font-bold">{information?.role}</h2>
          <p className="text-base font-light max-w-[220px]">{information?.slogan}</p>
        </div>
        <div className="font-medium mt-10 text-lg">
          <a
            href={getMediaUrl(information?.resume)}
            target="_blank"
            className="group flex items-end text-primary dark:text-primary-dark hover:text-theme transition-colors duration-300"
          >
            Resume
            <ArrowOutwardIcon
              width={15}
              height={15}
              className="ml-1.5 mb-1 arrowIcon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
          <Socials information={information} />
        </div>
      </header>
      <div className="flex flex-col w-full lg:w-1/2 lg:py-20 leading-7">
        <section className="relative w-full">
          <div className="hidden max-lg:block mb-7">
            <h2 className="font-medium text-xl">
              About
            </h2>
          </div>
          <div className="md:px-0">
            <RichText data={information?.description} />
          </div>
        </section>
          <section className="relative w-full mt-12 lg:mt-24">
          <div className="hidden max-lg:block mb-5">
            <h2 className="font-medium text-xl">
              Experience
            </h2>
          </div>
          {experience?.docs.map((experience, i) => (
            <a
              key={experience.id}
              className="relative group flex max-md:flex-col max-lg:py-4 lg:p-4 mb-4 cursor-pointer border border-transparent rounded-lg lg:hover:bg-item-background lg:hover:border-item-border lg:dark:hover:bg-item-background-dark lg:dark:hover:border-item-border-dark"
              href={experience.url || ''}
              target="_blank"
            >
              <div className="w-36 text-sm flex-shrink-0 mt-2 opacity-60">
                {experience.timeFrame}
              </div>
              <div className="flex flex-col md:ml-5 mt-1.5">
                <div className="text-xl items-end font-bold mb-1 max-md:mt-1 text-primary dark:text-primary-dark group-hover:text-theme transition-colors duration-300">
                  {experience.title}
                  <ArrowOutwardIcon
                  width={17}
                  height={17}
                    className="inline-block ml-2 arrowIcon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </div>
                <div className="text-sm my-1.5 opacity-60">{experience.role}</div>
                <div className="text-sm font-light leading-6">{experience.description}</div>
              </div>
            </a>
          ))}
        </section>
        <section className="relative mt-12 lg:mt-24 w-full">
          <div className="hidden max-lg:block mb-5">
            <h2 className="font-medium text-xl">
              Projects
            </h2>
          </div>
          {projects?.docs.map((project, i) => (
            <Link
              href={`/projects/${project.projectId}`}
              key={project.id}
              className="relative group flex max-md:flex-col items-start max-lg:py-4 lg:p-4 mb-4 cursor-pointer border border-transparent rounded-lg lg:hover:bg-item-background lg:hover:border-item-border lg:dark:hover:bg-item-background-dark lg:dark:hover:border-item-border-dark"
            >
              <div className="relative w-36 bg-item-background dark:bg-item-background-dark flex-shrink-0 rounded-md overflow-hidden border border-item-border dark:border-item-border-dark">
                <ImageComp image={project.iconImage} className="w-full" allowFullscreen={false} />
              </div>
              <div className="flex flex-col md:ml-5 max-md:mt-4 z-10">
                <div className=" text-xl items-end font-bold mb-1 max-md:mt-1 text-primary dark:text-primary-dark group-hover:text-theme transition-colors duration-300">
                  {project.title}
                  {project.subTitle ? ` — ${project.subTitle}` : ''}
                  <ArrowOutwardIcon
                    width={17}
                    height={17}
                    className="inline-block ml-2 arrowIcon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </div>
                <div className="text-sm font-light my-1.5  leading-6">{project.description}</div>
                <div className="flex flex-wrap mt-2 z-20">
                  {project.technology?.map((tech, i) => (
                    <div
                      key={`${tech.id}`}
                      className="relative px-3 py-1 bg-theme/20 text-theme text-xs font-medium rounded-full mr-2 mb-2 z-30"
                    >
                      {typeof tech.technology_item !== 'number' && tech.technology_item.title}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </section>
        <footer className="flex flex-col py-4 sm:py-0 gap-6  mb-6 sm:mb-0 mt-12 sm:mt-20 text-sm w-full max-w-[600px] font-light leading-7">
          {information?.footer && <RichText data={information?.footer} />}
          <ThemeSwitch />
        </footer>
      </div>
    </main>
  )
}
