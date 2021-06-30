import Head from "next/head";

const Metadata = ({ title, description }) => {
  return (
    <Head>
      <title>{ title ? title : "Ninja List" }</title>
      <meta name="description" content={ description ? description : "Listing our Ninjas" } />
      <meta name="author" content="Gerardo Valencia" />
      <meta property="og:title" content={title ? title : "Ninja Listing"} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description ? description : "Listing our Ninjas"} />
      <meta name="twitter:title" content={title ? title : "Ninja Listing"} />
      <meta name="twitter:description" content={description ? description : "Listing our Ninjas"} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}

export default Metadata;
