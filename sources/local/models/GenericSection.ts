import { Model } from '@stackbit/types';

export const GenericSection: Model = {
    type: 'object',
    name: 'GenericSection',
    label: 'Section',
    labelField: 'title.text',
    fields: [
        {
            name: 'moodInline',
            type: 'string',
            controlType: 'custom-inline-html',
            controlFilePath: '/public/control/custom-string/custom-string.html'
        },
        {
            name: 'moodFrame',
            type: 'string',
            controlType: 'custom-modal-html',
            controlFilePath: '/public/control/custom-string/custom-string.html'
        },
        {
            type: 'model',
            name: 'title',
            label: 'Title',
            required: false,
            hidden: false,
            localized: false,
            models: ['TitleBlock']
        },
        {
            type: 'string',
            name: 'subtitle',
            label: 'Subtitle',
            required: false,
            default: 'This is a subtitle',
            hidden: false,
            localized: false
        },
        {
            type: 'markdown',
            name: 'text',
            label: 'Text',
            required: false,
            default:
                'Aenean eros ipsum, interdum quis dignissim non, sollicitudin vitae nisl.\nAenean vel aliquet elit, at blandit ipsum. Sed eleifend felis sit amet\nerat molestie, hendrerit malesuada justo ultrices. Nunc volutpat at erat\nvitae interdum. Ut nec massa eget lorem blandit condimentum et at risus.',
            hidden: false,
            localized: false,
            actions: [
                {
                    name: 'doc_action1',
                    label: 'Doc Action 1',
                    type: 'field',
                    run: async (options) => {
                        const document = options.currentPageDocument;
                        if (!document) return;
                        // Send feedback in the appropriate context
                        const logger = options.getLogger();
                        logger.debug(`Running generate-title action on page: ${document.id}`);
                        // Generate title
                        // Update the document with the new random title
                        options.contentSourceActions.updateDocument({
                            document,
                            userContext: options.getUserContextForContentSourceType(
                                document.srcType,
                            ),
                            operations: [
                                {
                                    opType: 'set',
                                    fieldPath: options.fieldPath,
                                    modelField: options.modelField,
                                    field: { type: 'markdown', value: Math.random().toString() },
                                },
                            ],
                        });
                    }
                },
                {
                    name: 'doc_action2',
                    label: 'Doc Action 2',
                    type: 'field',
                    run: async (options) => {
                        const logger = options.getLogger();
                        logger.debug('running doc action');
                        return {
                            state: 'enabled',
                            error: 'Yes baby'
                        };
                    },
                    inputFields: [
                        {
                            type: 'string',
                            name: 'string'
                        }
                    ]
                },
            ]
        },
        {
            type: 'list',
            name: 'actions',
            label: 'Actions',
            required: false,
            hidden: false,
            localized: false,
            items: {
                type: 'model',
                models: ['Button', 'Link']
            }
        },
        {
            type: 'model',
            name: 'media',
            label: 'Media',
            required: false,
            hidden: false,
            localized: false,
            models: ['FormBlock', 'ImageBlock', 'BynderImageBlock', 'VideoBlock']
        },
        {
            type: 'model',
            name: 'badge',
            label: 'Badge',
            required: false,
            hidden: false,
            localized: false,
            models: ['Badge']
        },
        {
            type: 'string',
            name: 'elementId',
            label: 'Element ID',
            description: 'The unique ID for an HTML element, must not contain whitespace',
            required: false,
            default: '',
            hidden: false,
            localized: false,
            group: 'settings'
        },
        {
            type: 'enum',
            name: 'colors',
            label: 'Colors',
            description: 'The color theme of the section',
            required: false,
            default: 'bg-light-fg-dark',
            hidden: false,
            localized: false,
            options: [
                {
                    label: 'Light background, dark foreground',
                    value: 'bg-light-fg-dark',
                    textColor: '$dark',
                    backgroundColor: '$light',
                    borderColor: '#ececec'
                },
                {
                    label: 'Neutral background, dark foreground',
                    value: 'bg-neutral-fg-dark',
                    textColor: '$dark',
                    backgroundColor: '$neutral',
                    borderColor: '#ececec'
                },
                {
                    label: 'Dark background, light foreground',
                    value: 'bg-dark-fg-light',
                    textColor: '$light',
                    backgroundColor: '$dark',
                    borderColor: '#ececec'
                }
            ],
            group: 'styles',
            controlType: 'palette'
        },
        {
            type: 'model',
            name: 'backgroundImage',
            label: 'Background image',
            required: false,
            hidden: false,
            localized: false,
            models: ['BackgroundImage'],
            group: 'styles'
        },
        {
            type: 'style',
            name: 'styles',
            label: 'Styles',
            description: 'The styles field is controlled by Stackbit editor',
            required: false,
            hidden: false,
            localized: false,
            styles: {
                self: {
                    margin: ['tw0:96'],
                    padding: ['tw0:96'],
                    flexDirection: '*',
                    alignItems: ['flex-start', 'flex-end', 'center'],
                    justifyContent: ['flex-start', 'flex-end', 'center']
                },
                subtitle: {
                    fontStyle: '*',
                    fontWeight: ['400', '500', '700'],
                    textDecoration: '*',
                    textAlign: '*'
                },
                text: {
                    textAlign: '*'
                }
            }
        }
    ],
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: [
        {
            name: 'styles',
            label: 'Styles',
            icon: 'palette'
        },
        {
            name: 'settings',
            label: 'Settings',
            icon: 'gear'
        }
    ]
};
