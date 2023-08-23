import * as React from 'react';

import { getBaseLayoutComponent } from '../../../utils/base-layout';
import { getComponent } from '../../components-registry';

export default function PageLayout(props) {
    const { page, site } = props;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
    const { title, sections = [] } = page;

    const control1 = useSbControl({
        type: 'string',
        label: 'String field',
        name: 'control1'
    });
    const control2 = useSbControl({
        type: 'markdown',
        label: 'Markdown field',
        name: 'control2',
        value: 'preset value'
    });
    const controlModel1 = useSbControl({
        type: 'color',
        label: 'Color field',
        name: 'controlModel1',
        context: 'model',
        srcType: 'git',
        srcProjectId: '9a0364b9',
        modelName: 'PostLayout'
    });
    const controlDocument1 = useSbControl({
        type: 'enum',
        label: 'Enum field',
        name: 'controlDocument1',
        options: ['First', 'Second', 'Third'],
        context: 'document',
        srcType: 'git',
        srcProjectId: '9a0364b9',
        documentId: 'content/pages/index.md'
    });
    const controlField1 = useSbControl({
        type: 'image',
        label: 'Image field',
        name: 'controlField1',
        context: 'field',
        srcType: 'git',
        srcProjectId: '9a0364b9',
        documentId: 'content/pages/index.md',
        fieldPath: ['sections', 0]
    });

    React.useEffect(() => {
        return () => {
            window.stackbitControls = [];
        };
    }, []);

    React.useEffect(() => {
        window.stackbitControls = [control1, control2, controlModel1, controlDocument1, controlField1];

    }, [control1, control2, controlModel1, controlDocument1, controlField1]);

    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="sb-layout sb-page-layout">
                {title && (
                    <h1 className="sr-only" data-sb-field-path="title">
                        {title}
                    </h1>
                )}
                {sections.length > 0 && (
                    <div data-sb-field-path="sections">
                        {sections.map((section, index) => {
                            const Component = getComponent(section.__metadata.modelName);
                            if (!Component) {
                                throw new Error(`no component matching the page section's model name: ${section.__metadata.modelName}`);
                            }
                            return <Component key={index} {...section} data-sb-field-path={`sections.${index}`} />;
                        })}
                    </div>
                )}
            </main>
        </BaseLayout>
    );
}

export const useSbControl = (controlBase: any) => {
    const [value, setValue] = React.useState<any>(controlBase.value);
    const [control, setControl] = React.useState({ ...controlBase });

    React.useEffect(() => {
        setControl((control) => ({
            ...control,
            value,
            onChange(newValue) {
                console.log(`value updated for ${control.name} to ${newValue}`);
                setValue(newValue);
            }
        }))
    }, [value]);

    return control;
};
