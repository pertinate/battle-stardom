import express, { Router, Express as e } from 'express';
import fs from 'fs';
import path from 'path';
import config from '../../util/config';

const router = Router();

/**
 * <title>$TITLE</title>
    <meta name="description" content="$META_DESCRIPTION" />
    <meta name="og:title" content="$OG_TITLE" />
    <meta name="twitter:title" content="$OG_TITLE" />
    <meta name="og:description" content="$OG_DESCRIPTION" />
    <meta name="twitter:description" content="$OG_DESCRIPTION" />
    <meta name="og:image" content="$OG_IMAGE" />
    <meta name="twitter:image" content="$OG_IMAGE" />
    <meta name="og:url" content="$OG_URL" />
    <meta name="twitter:card" content="$OG_URL" />
    <meta name="og:type" content="$OG_TYPE" />
 */

const fillTags = (tags: any) => {
    const {
        title,
        metaDesc,
        ogTitle,
        ogDesc,
        ogImage,
        ogUrl,
        ogType
    } = tags;

    const filePath = path.resolve(config.rootDir, 'dist', './build', 'index.html');

    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        // replace the special strings with server generated strings
        data = data.replace(/\$TITLE/g, title);
        data = data.replace(/\$META_DESCRIPTION/g, metaDesc);
        data = data.replace(/\$OG_TITLE/g, ogTitle);
        data = data.replace(/\$OG_DESCRIPTION/g, ogDesc);
        data = data.replace(/\$OG_IMAGE/g, ogImage);
        data = data.replace(/\$OG_URL/g, ogUrl);
        data = data.replace(/\$OG_TYPE/g, ogType);
        // data = data.replace(/\$OG_DESCRIPTION/g, "Home page description");
        // result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
        return data;
    });
};
router.get('/', (request, response) => {
    const tags: ({
        title: string,
        metaDesc: string,
        ogTitle: string,
        ogDesc: string,
        ogImage: string,
        ogUrl: string,
        ogType: string;
    }) = {
        ...(request.session?.tags || {}),

    };
    if (request.session) {
        request.session.tags = tags;
    }

    response.send(fillTags(tags));
});

router.use(express.static(path.resolve(config.rootDir, 'dist', 'build')));

export default router;
