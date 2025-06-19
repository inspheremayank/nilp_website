"use client";

import { useContext, useEffect, useState } from "react";
import InnerBanner from "../Banners/InnerBanner";
import PageWrapper from "./PageWrapper";
import NotFoundPage from "@/app/not-found";
import { AppContext } from "@/context/AppContext";

const GetPageData = ({ slug }: { slug: string }) => {
    const [pageData, setPageData] = useState<any>(null);
    const contentInfo = useContext(AppContext);
    const getPagesData = contentInfo.pageInfo;
    useEffect(() => {
        if (getPagesData != null) {
            const parsedData = JSON.parse(getPagesData);
            const page = parsedData.list.find((page: any) => page.slug === slug);
            if (page != undefined) {
                setPageData(page);
            } else {
                setPageData(null);
            }
        }

    }, [slug, getPagesData]);
    return (
        <>
            {pageData != null ? (
                <>

                    {slug != 'home' && <InnerBanner pageData={pageData} />}
                    <PageWrapper pageData={pageData} />
                </>
            ) : <NotFoundPage />}

        </>
    )
}

export default GetPageData;