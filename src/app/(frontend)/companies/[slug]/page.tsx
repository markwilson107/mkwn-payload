import ImageComp from '@/components/Image'
import config from '@/payload.config'
import { getMediaAlt } from '@/utils/getMediaAlt'
import { getMediaUrl } from '@/utils/getMediaUrl'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import ArrowOutwardIcon from '@/assets/ArrowOutwardIcon'
import { unstable_cache } from 'next/cache'

type Props = {
  params: Promise<{ slug: string }>
}

const queryCompanyBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })

      const [experience, projects] = await Promise.all([
        payload.find({
          collection: 'experience',
          limit: 1,
          pagination: false,
          where: { slug: { equals: slug } },
        }),
        payload.find({
          collection: 'projects',
          pagination: false,
          where: { experienceSlug: { equals: slug } },
        }),
      ])

      return {
        experience: experience.docs?.[0] || null,
        projects: projects.docs,
      }
    },
    [`experience-${slug}`],
    {
      tags: [`experience-${slug}`],
    },
  )()

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params

  const { experience, projects } = await queryCompanyBySlug(slug)

  if (!experience) redirect('/')

  return (
    <main className="flex flex-col w-full h-full overflow-x-hidden">
      <div className="flex flex-col w-full min-h-dvh max-w-7xl mx-auto">
        <header className="flex items-center w-full py-4 sm:py-6 px-4 sm:px-12 flex-shrink-0">
          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-bold">mkwn.dev</h1>
          </Link>
        </header>
        <section className="w-full px-4 sm:px-12 py-3">
          <h1 className="flex lg:justify-center text-4xl sm:text-5xl font-bold">
            {experience.title}
          </h1>
          <p className="w-full lg:text-center flex flex-col lg:flex-row gap-1 lg:gap-3 lg:justify-center text-sm text-gray-400 mt-4 lg:mt-6 ">
            <span>{experience.role}</span>
            <span className="max-lg:hidden">{'•'}</span>
            <span>{experience.timeFrame}</span>
            {experience.url ? (
              <>
                <span className="max-lg:hidden">{'•'}</span>
                <span>
                  <a href={experience.url} target="_blank">
                    Link
                  </a>
                </span>
              </>
            ) : (
              ''
            )}
          </p>
          <div className="w-full flex lg:justify-center mt-2">
            <p className="text-sm text-gray-400 max-w-[400px] lg:text-center">
              {experience.description}
            </p>
          </div>
          <div className="flex flex-row items-center justify-center w-full mt-6 sm:mt-12">
            {projects?.map((project) => (
              <Link
                href={`/projects/${project.projectId}`}
                key={`project-${project.id}`}
                className="flex flex-row w-full lg:w-[50rem] cursor-pointer select-none group"
              >
                <div
                  className="relative rounded-xl overflow-hidden w-full flex p-4 sm:p-6 lg:p-8 sm:aspect-16/9"
                  style={{
                    background: project.banner?.backgroundColor || 'unset',
                    color: project.banner?.textColor || 'unset',
                  }}
                >
                  <ImageComp
                    image={project.banner?.bannerImage || ''}
                    className="!absolute left-0 top-0 w-full h-full overflow-hidden"
                    imgClassName="object-cover"
                    allowFullscreen={false}
                    showLoading={false}
                  />
                  <div className="z-10 flex flex-col w-full">
                    <div className="flex flex-col gap-3 z-10 text-2xl font-bold pb-4 max-w-[400px]">
                      {project.logo ? (
                        <div className="relative w-30 sm:w-44 flex-shrink-0 rounded-md overflow-hidden">
                          <ImageComp
                            image={project.logo || ''}
                            className="w-full"
                            allowFullscreen={false}
                          />
                        </div>
                      ) : (
                        <div>{project.title}</div>
                      )}
                      <div className="font-semibold text-sm sm:text-base opacity-90">
                        {project.description}
                      </div>
                      <div className="flex flex-row flex-wrap gap-2 mt-2 sm:mt-4">
                        {project.technology?.map((tech, i) => (
                          <div
                            key={`tech-bubble-${tech.id}`}
                            className="px-3 py-1 bg-theme/20 text-theme text-xs font-medium rounded-full "
                          >
                            <div className="mix-blend-difference">
                              {typeof tech.technology_item !== 'string' &&
                                tech.technology_item.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex mt-2 sm:mt-auto ">
                      <ArrowOutwardIcon className="ml-auto w-8 sm:w-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                {/* <img className='w-full' src={getMediaUrl(project.banner?.bannerImage || '')} /> */}
              </Link>
            ))}
          </div>
        </section>
        {/* <section
          className="relative flex flex-col lg:flex-row w-full text-center mb-6 md:mb-12"
          style={{
            background: product.banner?.backgroundColor || 'unset',
            color: product.banner?.textColor || 'unset',
          }}
        >
          {product.banner.bannerImage && (
            <Image
              priority
              fill
              className="absolute object-cover"
              src={getMediaUrl(product.banner.bannerImage)}
              alt={getMediaAlt(product.banner.bannerImage, 'Banner Image')}
              sizes="1000px"
              unoptimized
            />
          )}
          <div className="flex flex-col gap-3 justify-center items-center flex-2 p-6 sm:p-12 pt-12 lg:pt-6 z-10">
            {product.logo && (
              <ImageComp
                image={product.logo}
                className="w-[200px]"
                allowFullscreen={false}
                showLoading={false}
                sizes="200px"
              />
              // <Image
              //   src={getMediaUrl(product.logo)}
              //   width={200}
              //   height={0}
              //   alt={getMediaAlt(product.logo, 'Project Logo')}
              //   sizes="400px"
              // />
            )}

            {!product.logo && (
              <>
                <h2 className="font-bold text-5xl">{product.title}</h2>
                <h3 className="font-bold text-3xl">{product.subTitle}</h3>
              </>
            )}
            <p className="text-base mt-3 max-w-[350px]">{product.description}</p>
            <div className="flex flex-row flex-wrap justify-center gap-2 max-w-[350px] mt-2">
              {product.technology?.map((tech, i) => (
                <div
                  key={`tech-bubble-${tech.id}`}
                  className="px-3 py-1 bg-theme/20 text-theme text-xs font-medium rounded-full "
                >
                  <div className="mix-blend-difference">
                    {typeof tech.technology_item !== 'number' && tech.technology_item.title}
                  </div>
                </div>
              ))}
            </div>
            {product.url && (
              <Link className="flex items-center group" href={product.url || ''}>
                Link
                <ArrowOutwardIcon
                  width={15}
                  height={15}
                  className="ml-1.5 arrowIcon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            )}
          </div>
          <div className="flex flex-3 justify-center items-center p-4 pb-12 md:p-12 lg:p-18 z-10">
            <ImageComp
              image={product.featuredImage}
              className="w-full"
              allowFullscreen={false}
              showLoading={false}
              sizes="1200px"
            />
          </div>
        </section>
        {product.challenge && product.goal && (
          <section className="flex flex-col w-full">
            <div className="flex flex-col gap-5 flex-1 px-4 md:px-12 my-6 md:my-12">
              <h2 className="flex font-bold text-xl sm:text-3xl">Challenge</h2>
              <div className="text-base sm:text-lg">
                <RichText data={product.challenge} />
              </div>
            </div>

            <div className="flex flex-col gap-5 flex-1 px-4 md:px-12 my-6 md:my-12">
              <h2 className="flex font-bold text-xl sm:text-3xl">Goal</h2>
              <div className="text-base sm:text-lg">
                <RichText data={product.goal} />
              </div>
            </div>
          </section>
        )}
        <section className="flex flex-col gap-6 sm:gap-12 md:gap-24 my-6 md:my-12 px-4 md:px-12">
          {product.images?.map((image, i) => (
            <div key={image.id} className={`flex justify-center items-center flex-col`}>
              {(image.title || image.description) && (
                <div className="flex flex-col items-center mt-6 mb-6 md:mb-12">
                  {image.title && (
                    <h2 className="flex items-center text-center font-bold text-xl sm:text-3xl">
                      {image.title}
                    </h2>
                  )}
                  {image.description && (
                    <div className="flex-1  max-w-[600px]">
                      <p className="text-base md:text-xl text-center pt-3 md:px-4">
                        {image.description}
                      </p>
                    </div>
                  )}
                </div>
              )}
              <div
                key={image.id}
                className={`flex justify-center items-center w-full flex-col `} //md:flex-row ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}
              >
                <ImageComp
                  sizes="1200px"
                  image={image.image}
                  className="w-full flex-1 shadow-lg md:shadow-2xl"
                  allowFullscreen={true}
                />
              </div>
            </div>
          ))}
        </section>
        {product.technology && (
          <section className={`flex flex-col my-6 md:my-12 md:mb-8 px-4 md:px-12`}>
            <h2 className="flex font-bold text-2xl sm:text-3xl mb-6 md:mb-12">{'Technology'}</h2>
            <div className={`grid grid-cols-4 lg:grid-cols-6 gap-6 md:gap-12 w-full`}>
              {product.technology.map((tech, i) => (
                <div
                  key={tech.id}
                  className="group flex flex-col gap-3 items-center justify-center flex-shrink-0 "
                >
                  {typeof tech.technology_item !== 'number' && (
                    <>
                      <div className="flex items-center justify-center aspect-square w-full">
                        <ImageComp
                          image={tech.technology_item.logo}
                          className="w-full dark:invert opacity-80 hover:opacity-100"
                          showLoading={false}
                        />
                      </div>
                      <p className="text-sm sm:text-base text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {tech.technology_item.title}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        {(product.conclusion || product.reference) && (
          <section
            className="flex flex-col md:flex-row w-full my-6 md:my-12"
            style={{
              background: product.banner?.backgroundColor || 'unset',
              color: product.banner?.textColor || 'unset',
            }}
          >
            {product.conclusion && (
              <div className="flex flex-col gap-5 flex-1 py-12 md:py-24 px-4 md:px-12">
                <h2 className="flex font-bold text-2xl sm:text-3xl">Conclusion</h2>
                <div className="text-base sm:text-lg">
                  <RichText data={product.conclusion} />
                </div>
              </div>
            )}

            {product.reference && (
              <div className="flex flex-col gap-5 flex-1 py-12 md:py-24 px-4 md:px-12">
                <h2 className="flex font-bold text-2xl sm:text-3xl">Reference</h2>
                <div className="text-base sm:text-lg">
                  <RichText data={product.reference} />
                </div>
              </div>
            )}
          </section>
        )} */}
        <footer className="flex justify-between items-center w-full py-4 sm:py-6 px-4 sm:px-12 flex-shrink-0 mt-auto">
          <div></div>
          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-bold">© mkwn.dev</h1>
          </Link>
        </footer>
      </div>
    </main>
  )
}
