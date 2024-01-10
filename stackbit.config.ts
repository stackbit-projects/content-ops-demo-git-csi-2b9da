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
    },
    experimental: {
        ssg: {
            logPatterns: {
                up: []
            }
        }
    },
    viewports: [
        {
            label: 'Just width',
            size: { width: 800 }
        },
        {
            label: 'Just height',
            size: { height: 500 }
        },
        {
            label: 'Width and height',
            size: { width: 800, height: 400 }
        },
        {
            label: 'Width and height high res',
            size: { width: 3000, height: 2000 }
        }
    ],
    actions: [
        {
            name: 'global1',
            label: 'Global 1',
            type: 'global',
            inputFields: [{
                type: 'string',
                name: 'testString'
            }, {
                type: 'enum',
                name: 'enumField',
                options: ['first', 'second', 'third'],
                controlType: 'button-group'
            }, {
                type: 'markdown',
                name: 'markdownField'
            }],
            run: async () => {
                await new Promise((resolve) => setTimeout(resolve, 5000));
                return {
                    state: 'enabled',
                    success: 'Yes'
                }
            }
        },
        {
            name: 'bulk1',
            label: 'Bulk 1',
            type: 'bulk',
            run: async () => {
                await new Promise((resolve) => setTimeout(resolve, 5000));
                return {
                    state: 'enabled',
                    success: 'Yes'
                }
            }
        }
    ],
    filterModel: (context) => {
        context.getLogger().debug(`filterModel>>>${context.model.name}${context}`)
        if (context.model.name === 'PostLayout') {
            return false;
        }
    },
    filterDocument: (context) => {
        context.getLogger().debug(`filerDocumnt>>>${context.document.id}${context}`)
        if (context.document.id === 'content/pages/careers.md') {
            return false;
        }
    },
    treeViews: (context) => {
        const docs = context.getDocuments();
        return Promise.resolve([
            {
                label: 'Pages',
                stableId: 'test',
                children: [
                    {
                        label: 'All pages',
                        stableId: 'all-pages',
                        children: docs.filter((doc) => context.getModelByName(doc)?.type === 'page').map((doc) => ({ document: doc }))
                    },
                    {
                        label: 'Posts',
                        stableId: 'posts-pages',
                        children: docs.filter((doc) => doc.modelName === 'PostLayout').map((doc) => ({ document: doc }))
                    }
                ]
            },
            {
                label: 'All',
                stableId: 'all',
                children: docs.map((doc) => ({
                    document: doc
                }))
            },
        ]);
    }
});

export default config;
