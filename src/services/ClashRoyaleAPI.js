import { get } from "./api";

export const getClanRiverRaceData = async clanTag => {
    const response = await get(`/riverrace/${clanTag}`);
    return response;
};