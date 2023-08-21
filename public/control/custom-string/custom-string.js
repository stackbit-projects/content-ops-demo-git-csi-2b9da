const $a5c39f19536557ba$var$initialContextWindow = window;
// create object if page script loads before control
$a5c39f19536557ba$var$initialContextWindow.stackbit = $a5c39f19536557ba$var$initialContextWindow.stackbit || {};
$a5c39f19536557ba$var$initialContextWindow.stackbit.onUpdate = (options)=>{
    console.log("onUpdate, options:", options);
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const docStringField = options.documentField;
    const nameParts = docStringField?.value?.split(" ") ?? [];
    firstName.value = nameParts[0] || "";
    lastName.value = nameParts[1] || "";
    if (options.init) {
        const update = function() {
            options.updateDocument({
                operations: [
                    {
                        opType: "set",
                        fieldPath: options.fieldPath,
                        modelField: options.modelField,
                        field: {
                            type: docStringField?.type ?? 'string',
                            value: `${firstName.value} ${lastName.value}`.trim()
                        }
                    }
                ]
            }).then((result)=>{
                console.log("saved, result:", result);
            }).catch((err)=>{
                console.log(`Error ${err}`);
            });
        };
        firstName.addEventListener("change", update);
        lastName.addEventListener("change", update);
        // options.setDesiredControlSize({
        //     width: 100,
        //     height: 400
        // });
    }
};


