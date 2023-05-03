import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import { allModels } from 'sources/local/models';

const gitContentSource = new GitContentSource({
    rootPath: __dirname,
    contentDirs: ['content'],
    models: Object.values(allModels),
    assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/'
    }
});

export const config = defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'nextjs',
    nodeVersion: '16',
    styleObjectModelName: 'ThemeStyle',
    contentSources: [gitContentSource],
    assetSources: [{ type: 'bynder' }],
    presetSource: {
        type: 'files',
        presetDirs: ['sources/local/presets']
    }
});

export default config;
