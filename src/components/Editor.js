import React from 'react';
import { GraphQLEditor } from 'graphql-editor';

const Editor = (props) => {
    const {setSchema, schema} = props;
  return (
    <div className='editor'>
        <GraphQLEditor
            onSchemaChange={(props) => {
                setSchema(props);
            }}
            schema={schema}
        />
    </div>
  )
}

export default Editor