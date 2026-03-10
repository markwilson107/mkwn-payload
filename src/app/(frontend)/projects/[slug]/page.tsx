import config from '@/payload.config'
import { JSXConverter, RichText, defaultJSXConverters } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import ArrowBackSharp from '@/assets/ArrowBackSharp'
import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import FullscreenWrapper from '@/fields/RichTextImageWrapper'
import BackButton from '@/components/BackArrow'
import ThemeSwitch from '@/components/ThemeSwitch'

type Props = {
  params: Promise<{ slug: string }>
}

const queryProjectsBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })

      const result = await payload.find({
        collection: 'projects',
        limit: 1,
        pagination: false,
        where: { slug: { equals: slug } },
      })

      return result.docs?.[0] || null
    },
    [`site-projects`],
    {
      tags: [`site-data`],
    },
  )()

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params

  const product = await queryProjectsBySlug(slug)

  if (!product) redirect('/')

  return (
    <main className="flex flex-col w-full h-full overflow-x-hidden">
      <div className="flex flex-col w-full min-h-dvh max-w-7xl mx-auto">
        <header className="flex items-center w-full py-4 sm:py-6 px-4 sm:px-12 flex-shrink-0">
          <BackButton />
          <h1 className="text-xl sm:text-2xl font-bold">mkwn.dev</h1>
            <ThemeSwitch className='ml-auto' />
        </header>
        <section className="w-full px-4 sm:px-12 rich-text-content">
          {product.content && (
            <RichText
              data={product.content}
              converters={{
                ...defaultJSXConverters,
                upload: (props: { node: SerializedUploadNode }) => {
                  const originalConverter = defaultJSXConverters.upload as any
                  const DefaultImage =
                    typeof originalConverter === 'function'
                      ? originalConverter(props)
                      : originalConverter
                  return <FullscreenWrapper node={props.node}>{DefaultImage}</FullscreenWrapper>
                },
              }}
            />
          )}
        </section>

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
