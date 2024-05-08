import Head from "next/head";


function Meta( {title, keywords, description, siteTitle} ){    
    return (<>

    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta rel="icon" href="/favicon.ico" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />

        <title>{`${title} :: ${siteTitle}`}</title>
      </Head>

    </>)
}

Meta.defaultProps = {
    siteTitle: "NextLevelFood",    //giving this to title varible
    title: "Home",                //giving this to sitetitle varible
    keywords: "NextLevelFood",     //giving this to keywords varible
    description: "NextLevelFood",  //giving this to desciption varible
  };

export default Meta;