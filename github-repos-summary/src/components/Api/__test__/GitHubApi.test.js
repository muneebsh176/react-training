import { useRepos } from '../GitHubApi'
import { renderHook } from '@testing-library/react-hooks';


describe('useRepos hook', () => {

    it('should make the api call to fetch the repos data and return it',
        async () => {


            const page = 1
            const user = 'user-1'

            const reposUrl = `https://api.github.com/users/${user}/repos?per_page=10&page=${page}&type=public`

            const fetchMock = jest.spyOn(window, "fetch")
            fetchMock.mockImplementation((url) => {
                switch (url) {
                    case reposUrl:
                        const reposResponse = {
                            json: () => Promise.resolve([{ name: "repo-1" }, { name: "repo-2" }])
                        };
                        return Promise.resolve(reposResponse);
                    default:
                        const response = {
                            json: () => Promise.resolve([])
                        };
                        return Promise.resolve(response);
                }

            });
            const {
                result,
                waitForNextUpdate
            } = renderHook(() => useRepos(page, user));

            await waitForNextUpdate();

            expect(result.current.status).toBe("DONE");
        });

});