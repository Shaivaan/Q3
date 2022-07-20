import { act, render, screen, waitFor } from '@testing-library/react';
import { Card } from '@mui/material';

import { Main } from './components/Main';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Json } from './components/Json';
jest.setTimeout(10000)

const MockMain = () => {
  return <>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </>
}

// Main
it('New stand test exist', () => {
  render(<MockMain />)
  const divElement = screen.getByText("News-Stand")
  expect(divElement).toBeInTheDocument();
});


it('renderss without crashing', () => {
  render(<MockMain />)
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});


it('Loading text gone', () => {

    render(<BrowserRouter><Main/></BrowserRouter>)

  const loading = screen.getByText(/Loading.../i)
  waitFor(()=>{
        expect(loading).not.toBeInTheDocument();
    })
});



//   it('data fetched', async() => {
//     render (<MockMain/>)
//             const errorMsg = await screen.findByText("See Raw JSON");
//             expect(errorMsg).not.toBeInTheDocument();

//   });



// JSon


const MockData = {
  "created_at": "2022-07-20T12:59:50.000Z",
  "title": "The Hotel-Spirit",
  "url": "https://slate.com/business/2022/07/hotels-rental-market-housing-prices-shortage-solution.html",
  "author": "civeng",
  "points": 1,
  "story_text": null,
  "comment_text": null,
  "num_comments": 1,
  "story_id": null,
  "story_title": null,
  "story_url": null,
  "parent_id": null,
  "created_at_i": 1658321990,
  "_tags": [
    "story",
    "author_civeng",
    "story_32165131"
  ],
  "objectID": "32165131",
  "_highlightResult": {
    "title": {
      "value": "The Hotel-Spirit",
      "matchLevel": "none",
      "matchedWords": []
    },
    "url": {
      "value": "https://slate.com/business/2022/07/hotels-rental-market-housing-prices-shortage-solution.html",
      "matchLevel": "none",
      "matchedWords": []
    },
    "author": {
      "value": "civeng",
      "matchLevel": "none",
      "matchedWords": []
    }
  }
}




const MockJSON = () => {
  const history = createMemoryHistory();
  history.push("/json", { ...MockData });
  return (
    <Router location={history.location} navigator={history}>
      <Json />
    </Router>
  );
};


it('Json components exist', () => {
  render(<MockJSON />)
  expect(screen.getByRole("button")).toBeInTheDocument();
});

it('Json components exist', () => {
  render(<MockJSON />)
  expect(screen.getByTestId("pre")).toBeInTheDocument();
});