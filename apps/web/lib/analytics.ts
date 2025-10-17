export type AnalyticsEvent =
  | { type: "request_access_submitted"; payload?: Record<string, unknown> }
  | { type: "nda_requested"; payload?: Record<string, unknown> }
  | { type: "intel_downloaded"; payload?: Record<string, unknown> }
  | { type: "how_step_clicked"; payload?: { step: number } };

export function trackEvent(event: AnalyticsEvent) {
  if (process.env.NODE_ENV !== "production") {
    console.info("Analytics event", event);
  }
  // Wire up analytics provider here (Segment, GA4, etc.)
}
