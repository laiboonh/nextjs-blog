import Layout from "../../components/layout";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

import { prisma } from "../../lib/prisma";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const getServerSideProps = async ({ params }) => {
  const id = params.id;
  let postData = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(postData.content);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  postData = { ...postData, ...{ content: contentHtml } };

  postData = JSON.parse(JSON.stringify(postData));
  return { props: { postData } };
};

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    content: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  );
}
