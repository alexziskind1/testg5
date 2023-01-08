
import { Track, TrackLevel, TrackLevelType, TrackBundle } from '../models';
import { defaultArray } from '../core';


export function trackLevelFromLevels_2(l: Queries.TracksJsonLevels): TrackLevel {
    return {
        levelId: l.levelId as TrackLevelType,
        levelName: l.title,
        levelDescription: l.description
    };
}

export function trackBundleFromBundles_2(b:  Queries.TracksJsonBundles): TrackBundle {
    return {
        bundleId: b.bundleId,
        bundleOrder: b.order,
        bundleDescription: b.description
    };
}

export function trackFromTracksJsonEdge(edge:  Queries.TracksJsonEdge): Track {
    const t = edge.node;
    return trackFromTracksJson(t);
}

export function trackFromTracksJson(t:  Queries.TracksJson): Track {
    const track: Track = {
        trackId: t.trackId,
        title: t.title,
        description: t.description,
        imgSrc: t.imageSrc,
        levels: defaultArray(t.levels).map(trackLevelFromLevels_2),
        bundles: defaultArray(t.bundles).map(trackBundleFromBundles_2)
    };
    return track;
}
