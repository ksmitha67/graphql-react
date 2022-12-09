import React, { useState, useRef } from 'react';
import { GraphQLEditor } from 'graphql-editor';

import FileSaver from 'file-saver';


const types = {
    name: `
        type Query{
            names: [Smita]
        }
    `,
    nameLibrary: `
        type Smita{
            name: String;
        }
    `,
};

export const App = () => {

const uploadRef = useRef(null);

const [schema, setSchema] = useState({
  code: types.name,
  libraries: types.nameLibrary
});

const resetEditor = ()=>{
    console.log(schema)
    // setSchema(undefined)
    console.log("code", schema.code)

    setSchema({code: '', libraries:''});
   
    // console.log(schema)
}

const loadExisting = ()=>{
    uploadRef.current.click();
}

const commitGraph =  ()=>{
    var file = new File([schema.code], "hello world.graphqls", {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(file);

}

const handleData = (e)=>{
    const data = e.target.result;
    // console.log("file data", data);
    setSchema({code : data, libraries : "",})
}

const handleChange = (file)=>{
    let fileContent = new FileReader();
    fileContent.onloadend  = handleData;
    console.log(fileContent);
    fileContent.readAsText(file);

}

return (
    <>
        <div className='main'>
            <div className='buttons'>
                <button onClick={resetEditor}>Create New Graph</button>
                <button onClick={loadExisting}>Load Existing</button>
                <button onClick={commitGraph}>Commit graph</button>
                <input type="file" 
                    style={{display:"none"}}
                    ref = {uploadRef}
                    onChange = {
                        (e)=> handleChange(e.target.files[0])
                    } 
                />
            </div>
            <div className='editor'>
        <GraphQLEditor
            onSchemaChange={(props) => {
            setSchema(props);
            }}
            schema={schema}
        />
        </div>
        </div>
    </>
  );
};
