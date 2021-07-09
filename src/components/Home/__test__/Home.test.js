import Home from "../Home"
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom/extend-expect"

import { act } from "react-dom/test-utils";

describe("Home", () => {

    it("should render elements with returned data", async () => {

        const user = "user-1"
        const page = 1
        const repo = "repo-1"

        const reposUrl = `https://api.github.com/users/${user}/repos?per_page=10&page=${page}&type=public`
        const commitsUrl = `https://api.github.com/repos/${user}/${repo}/commits`

        const fetchMock = jest.spyOn(window, "fetch")
        fetchMock.mockImplementation((url) => {
            switch (url) {
                case reposUrl:
                    const reposResponse = {
                        json: () => Promise.resolve([{ name: "repo-1" }, { name: "repo-2" }])
                    };
                    return Promise.resolve(reposResponse);
                case commitsUrl:
                    const commitsResponse = {
                        json: () => Promise.resolve([{
                            "commit": {
                                "author": {
                                    "date": "2014-11-07T22:01:45Z",
                                }
                            }
                        }])
                    };
                    return Promise.resolve(commitsResponse);
                default:
                    const response = {
                        json: () => Promise.resolve([])
                    };
                    return Promise.resolve(response);
            }

        });

        await act(async () => {
            render(<BrowserRouter><Home user={user} /></BrowserRouter>);
        })

        expect(screen.getAllByText('repo-1')).toBeDefined();

    });
});