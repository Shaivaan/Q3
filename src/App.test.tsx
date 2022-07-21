import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Post } from './components/Card';

import { Main } from './components/Main';
import { BrowserRouter, Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Json } from './components/Json';
import { Routers } from './Routers/Routers';
import App from './App';
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
  expect(screen.getByText("News-Stand")).toBeInTheDocument();
});


it('should render Loading screen and data', async () => {
  render(<MockMain />)
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    const searchBox = screen.getByLabelText(/Search by Author and Title/i);
    expect(searchBox).toBeInTheDocument();
  }, { timeout: 5000 });

});

it("should navigate to Json page", async () => {
  render(<MockMain />);

  await waitFor(() => {
    const jsonButton = screen.getAllByRole("button", { name: /See Raw JSON/i });
    fireEvent.click(jsonButton[0]);
  }, { timeout: 5000 });
})

it("should search for post", async () => {
  render(<MockMain />);

  await waitFor(() => {
    const searchBox = screen.getByLabelText(/Search by Author and Title/i);
    fireEvent.change(searchBox, { target: { value: "a" } });
  }, { timeout: 5000 });
})

it("should render the routers component", () => {
  render(<BrowserRouter> <Routers /> </BrowserRouter>);
});

it("should render the Post component", () => {
  render(
    <BrowserRouter>
      <Post
        title="Youtube"
        url="https://meta.you.be"
        date={new Date().toLocaleString()}
        tags={["react", "youtube"]}
      />
    </BrowserRouter>
  );
});

it("should render the app component", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});



// it('should render input after loading...', async () => {
//   render(<MockMain />)
//   await waitFor(() => {
//     expect(screen.findByLabelText("Search by Author and Title")).toBeInTheDocument();
//   }, { timeout: 5000 })
// });

// it('should render data after loading completion', async() => {
//   render(<MockMain/>)
//       expect(await screen.findAllByRole("button")).toBeInstanceOf(Array);
// });


// it('should render Loading... in initial', async () => {
//   render(<MockMain />)
//   await waitFor(() => {
//     // expect(screen.getAllByRole("button")).toBeInstanceOf(Array);
//     expect(screen.getByText("News-Stand")).toBeInTheDocument();
//   })
// });




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

// const mdata = null;

// const MockJSON2 = () => {
//   const history = createMemoryHistory();
//   history.push("/json", { ...mdata });
//   return (
//     <Router location={history.location} navigator={history}>
//       <Json />
//     </Router>
//   );
// };


it('should render the JSON component & go back should work', () => {
  render(<MockJSON />)

  const goHomeBtn = screen.getByRole("button", { name: /Home/i });
  expect(goHomeBtn).toBeInTheDocument();
  fireEvent.click(goHomeBtn);
});

it("should redirect to home page if no data is present", async () => {
  render(<Json />, { wrapper: MemoryRouter });
});