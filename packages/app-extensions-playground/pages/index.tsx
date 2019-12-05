import React from 'react';
import {Stack, Layout} from '@shopify/polaris';
import HomeCard from '../components/HomeCard';

export default function Home() {
  return (
    <Layout>
      <Stack>
        <HomeCard
          url="/json-repl"
          image="static/images/repl.jpg"
          title="JSON REPL"
          label="JSON"
          description="Use JSON to test the rendering output in the REPL. JSON is the format we will use to store the AST."
        />
        <HomeCard
          url="/repl"
          image="static/images/repl.jpg"
          title="LISP REPL"
          label="LISP"
          description="Use LISP to test the rendering output in the REPL. LISP is not the saved format of the Renderer. It is strictly for ease of internal debugging and testing."
        />
        <HomeCard
          url="/builder"
          image="static/images/builder.jpg"
          title="UI Builder"
          description="This is a dev environment for the UI Builder. The UI Builder will live in the partners dashboard and will allow partners to generate Extensions UI."
        />
      </Stack>
    </Layout>
  );
}
