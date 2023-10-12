/**
 * This file defines all the valid tileset names that can be obtained from the tilserver.
 * Adjust the values here if modifying the list of styles in the tileserver.
 */

export type BuildingMapTileset = 
    'date_year' | 
    'size_height' |
    'construction_core_material' |
    'construction_structural_system' |
    'construction_foundation' |
    'construction_roof_shape' |
    'construction_roof_covering' |
    'location' |
    'is_domestic' |
    'likes' |
    'typology_likes' |
    'community_local_significance_total' |
    'community_expected_planning_application_total' |
    'community_in_public_ownership' |
    'planning_applications_status_all' |
    'planning_applications_status_recent' |
    'planning_applications_status_very_recent' |
    'planning_combined' |
    'sust_dec' |
    'building_attachment_form' |
    'landuse' |
    'original_landuse' |
    'dynamics_demolished_count' |
    'disaster_severity' |
    'team' |
    'survival_status'|
    'typology_classification'|
    'typology_style_period' |
    'typology_dynamic_classification';

export type SpecialMapTileset = 'base_light' | 'base_night' | 'base_night_outlines' | 'highlight' | 'number_labels' | 'base_boroughs';

export type MapTileset = BuildingMapTileset | SpecialMapTileset;
