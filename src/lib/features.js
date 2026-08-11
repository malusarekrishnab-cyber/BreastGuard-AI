// Local fallback list of the 30 Breast Cancer Wisconsin Diagnostic features.
// The real source of truth is breast_cancer_features.pkl served by the backend
// at GET /api/features. This list is only used so the form can render while the
// backend is unreachable; prediction itself always goes through the backend.

export const DEFAULT_FEATURES = [
  "radius_mean", "texture_mean", "perimeter_mean", "area_mean", "smoothness_mean",
  "compactness_mean", "concavity_mean", "concave points_mean", "symmetry_mean", "fractal_dimension_mean",
  "radius_se", "texture_se", "perimeter_se", "area_se", "smoothness_se",
  "compactness_se", "concavity_se", "concave points_se", "symmetry_se", "fractal_dimension_se",
  "radius_worst", "texture_worst", "perimeter_worst", "area_worst", "smoothness_worst",
  "compactness_worst", "concavity_worst", "concave points_worst", "symmetry_worst", "fractal_dimension_worst",
];

// Typical dataset values — used only as input placeholders, never auto-filled.
export const FEATURE_PLACEHOLDERS = {
  radius_mean: "14.13", texture_mean: "19.29", perimeter_mean: "91.97", area_mean: "654.9",
  smoothness_mean: "0.0964", compactness_mean: "0.0935", concavity_mean: "0.0879",
  "concave points_mean": "0.0489", symmetry_mean: "0.1812", fractal_dimension_mean: "0.0623",
  radius_se: "0.4052", texture_se: "1.2168", perimeter_se: "2.866", area_se: "40.34",
  smoothness_se: "0.00704", compactness_se: "0.02544", concavity_se: "0.03189",
  "concave points_se": "0.01179", symmetry_se: "0.02054", fractal_dimension_se: "0.003795",
  radius_worst: "16.27", texture_worst: "25.68", perimeter_worst: "107.0", area_worst: "880.6",
  smoothness_worst: "0.1324", compactness_worst: "0.2543", concavity_worst: "0.2729",
  "concave points_worst": "0.1146", symmetry_worst: "0.2912", fractal_dimension_worst: "0.08395",
};

export function placeholderFor(name) {
  return FEATURE_PLACEHOLDERS[name] ?? "0.00";
}

export function formatLabel(name) {
  return name
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function groupFeatures(features) {
  const mean = [];
  const se = [];
  const worst = [];
  for (const f of features) {
    if (f.endsWith("_se")) se.push(f);
    else if (f.endsWith("_worst")) worst.push(f);
    else mean.push(f); // _mean features (and any unmapped)
  }
  return { mean, se, worst };
}