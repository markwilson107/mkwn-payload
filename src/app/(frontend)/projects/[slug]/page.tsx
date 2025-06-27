import ImageComp from '@/components/Image'
import config from '@/payload.config'
import { getMediaAlt } from '@/utils/getMediaAlt'
import { getMediaUrl } from '@/utils/getMediaUrl'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { MdArrowOutward } from 'react-icons/md'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const project = await payload.find({
    collection: 'projects',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  const projectData = project.docs?.[0] || null

  if (!projectData) redirect('/')

  return (
    <main className="flex flex-col w-full h-full overflow-x-hidden">
      <div className="flex flex-col w-full min-h-dvh max-w-7xl mx-auto">
        <header className="flex items-center w-full py-4 sm:py-6 px-6 sm:px-12 flex-shrink-0">
          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-bold">mkwn.dev</h1>
          </Link>
        </header>
        <section
          className="relative flex flex-col lg:flex-row w-full text-center mb-6 md:mb-12"
          style={{
            background: !projectData.banner.bannerImage
              ? projectData.banner?.backgroundColor || 'unset'
              : 'unset',
            color: projectData.banner?.textColor || 'unset',
          }}
        >
          {projectData.banner.bannerImage && (
            <Image
              priority
              fill
              className="absolute object-cover"
              src={getMediaUrl(projectData.banner.bannerImage)}
              alt={getMediaAlt(projectData.banner.bannerImage, 'Banner Image')}
              sizes="800px"
            />
          )}
          <div className="flex flex-col gap-2 justify-center items-center flex-2 p-6 pt-12 lg:pt-6 z-10">
            {projectData.logo && (
              <Image
                src={getMediaUrl(projectData.logo)}
                width={200}
                height={0}
                alt={getMediaAlt(projectData.logo, 'Project Logo')}
                sizes="400px"
              />
            )}

            <h2 className="font-bold text-5xl">{projectData.title}</h2>
            <h3 className="font-bold text-2xl">{projectData.subTitle}</h3>
            <p className="text-lg">{projectData.description}</p>
            {projectData.url && (
              <Link className="flex items-center group" href={projectData.url || ''}>
                Link
                <MdArrowOutward
                  size={15}
                  className="ml-1.5 arrowIcon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            )}
          </div>
          <div className="flex flex-3 justify-center items-center p-6 pb-12 md:p-12 lg:p-18 z-10">
            <ImageComp
              image={projectData.featuredImage}
              className="w-full"
              allowFullscreen={true}
            />
          </div>
        </section>
        {projectData.challenge && projectData.goal && (
          <section className="flex flex-col md:flex-row w-full">
            <div className="flex flex-col gap-5 flex-1 px-6 md:px-12 my-6 md:my-12">
              <h2 className="flex font-bold text-2xl sm:text-3xl">Challenge</h2>
              <div className="text-base sm:text-lg">
                <RichText data={projectData.challenge} />
              </div>
            </div>

            <div className="flex flex-col gap-5 flex-1 px-6 md:px-12 my-6 md:my-12">
              <h2 className="flex font-bold text-2xl sm:text-3xl">Goal</h2>
              <div className="text-base sm:text-lg">
                <RichText data={projectData.goal} />
              </div>
            </div>
          </section>
        )}
        <section className="flex flex-col gap-12 md:gap-24 my-6 md:my-12 px-6 md:px-12">
          {projectData.images?.map((image, i) => (
            <div key={image.id} className={`flex justify-center flex-col`}>
              {image.title && (
                <h2 className="flex items-center font-bold text-2xl sm:text-3xl mb-6 md:mb-12">
                  {image.title}
                </h2>
              )}
              <div
                key={image.id}
                className={`flex justify-center items-center flex-row w-full ${i !== 0 && projectData.images![i - 1].description ? 'flex-row-reverse' : ''}`}
              >
                {image.description && (
                  <div className="flex-2">
                    <p className="text-2xl sm:text-3xl font-bold ">{image.description}</p>
                  </div>
                )}
                <ImageComp image={image.image} className="w-full" allowFullscreen={true} />
              </div>
            </div>
          ))}
        </section>
        {projectData.technology && (
          <section className={`flex flex-col my-6 md:my-12 md:mb-8 px-6 md:px-12`}>
            <h2 className="flex font-bold text-2xl sm:text-3xl mb-6 md:mb-12">{'Technology'}</h2>
            <div
              className={`grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 w-full`}
            >
              {projectData.technology.map((tech, i) => (
                <div
                  key={tech.id}
                  className="group flex flex-col gap-3 items-center justify-center flex-shrink-0 "
                >
                  {typeof tech.technology !== 'string' && (
                    <>
                      <div className="flex items-center justify-center aspect-square w-full">
                        <ImageComp
                          image={tech.technology.logo}
                          className="w-full dark:invert opacity-80 hover:opacity-100"
                          showLoading={false}
                        />
                      </div>
                      <p className="text-sm sm:text-base font-bold text-center">
                        {tech.technology.title}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        {projectData.conclusion && projectData.reference && (
          <section
            className="flex flex-col md:flex-row w-full my-6 md:my-12"
            style={{
              background: projectData.banner?.backgroundColor || 'unset',
              color: projectData.banner?.textColor || 'unset',
            }}
          >
            <div className="flex flex-col gap-5 flex-1 py-12 md:py-24 px-6 md:px-12">
              <h2 className="flex font-bold text-2xl sm:text-3xl">Conclusion</h2>
              <div className="text-base sm:text-lg">
                <RichText data={projectData.conclusion} />
              </div>
            </div>

            <div className="flex flex-col gap-5 flex-1 py-12 md:py-24 px-6 md:px-12">
              <h2 className="flex font-bold text-2xl sm:text-3xl">Reference</h2>
              <div className="text-base sm:text-lg">
                <RichText data={projectData.reference} />
              </div>
            </div>
          </section>
        )}
        <footer className="flex justify-between items-center w-full py-4 sm:py-6 px-6 sm:px-12 flex-shrink-0">
          <div></div>
          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-bold">© mkwn.dev</h1>
          </Link>
        </footer>
      </div>
    </main>
  )
}
