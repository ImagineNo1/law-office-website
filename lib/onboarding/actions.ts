"use server";

import { revalidatePath } from "next/cache";
import { getCurrentClient } from "@/lib/client-auth";
import { getCurrentUser } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { TOUR_VERSION } from "@/components/onboarding/tour-steps";
import { ClientUser } from "@/models/ClientUser";
import { User } from "@/models/User";

type SafeTourState = {
  completed: boolean;
  skipped: boolean;
  lastSeenTourVersion: string;
  shouldShow: boolean;
  source: "db" | "fallback";
};

type OnboardingDoc = {
  onboarding?: {
    adminTourCompleted?: boolean;
    adminTourSkippedAt?: Date | string | null;
    dashboardTourCompleted?: boolean;
    dashboardTourSkippedAt?: Date | string | null;
    lastSeenTourVersion?: string;
  };
};

function stateFromOnboarding(
  onboarding: OnboardingDoc["onboarding"],
  kind: "admin" | "client",
): SafeTourState {
  const completed =
    kind === "admin"
      ? Boolean(onboarding?.adminTourCompleted)
      : Boolean(onboarding?.dashboardTourCompleted);
  const skipped =
    kind === "admin"
      ? Boolean(onboarding?.adminTourSkippedAt)
      : Boolean(onboarding?.dashboardTourSkippedAt);
  const lastSeenTourVersion = onboarding?.lastSeenTourVersion ?? "";
  return {
    completed,
    skipped,
    lastSeenTourVersion,
    shouldShow:
      (!completed && !skipped) || lastSeenTourVersion !== TOUR_VERSION,
    source: "db",
  };
}

const fallbackState: SafeTourState = {
  completed: false,
  skipped: false,
  lastSeenTourVersion: "",
  shouldShow: true,
  source: "fallback",
};

export async function getAdminTourState(): Promise<SafeTourState> {
  const admin = await getCurrentUser();
  if (!admin) return { ...fallbackState, shouldShow: false };

  await connectDb();
  const user = await User.findById(admin.id)
    .select("onboarding")
    .lean<OnboardingDoc>();
  return stateFromOnboarding(user?.onboarding, "admin");
}

export async function markAdminTourCompleted(
  mode: "completed" | "skipped" = "completed",
) {
  const admin = await getCurrentUser();
  if (!admin) return { ok: false };

  await connectDb();
  const now = new Date();
  await User.updateOne(
    { _id: admin.id },
    {
      $set: {
        "onboarding.adminTourCompleted": true,
        "onboarding.lastSeenTourVersion": TOUR_VERSION,
        ...(mode === "completed"
          ? {
              "onboarding.adminTourCompletedAt": now,
              "onboarding.adminTourSkippedAt": null,
            }
          : { "onboarding.adminTourSkippedAt": now }),
      },
    },
  );
  revalidatePath("/admin");
  return { ok: true };
}

export async function resetAdminTour() {
  const admin = await getCurrentUser();
  if (!admin) return { ok: false };

  await connectDb();
  await User.updateOne(
    { _id: admin.id },
    {
      $set: {
        "onboarding.adminTourCompleted": false,
        "onboarding.adminTourCompletedAt": null,
        "onboarding.adminTourSkippedAt": null,
        "onboarding.lastSeenTourVersion": "",
      },
    },
  );
  revalidatePath("/admin");
  return { ok: true };
}

export async function getClientTourState(): Promise<SafeTourState> {
  const client = await getCurrentClient();
  if (!client || client.id === "demo-client")
    return { ...fallbackState, source: "fallback" };

  await connectDb();
  const user = await ClientUser.findById(client.id)
    .select("onboarding")
    .lean<OnboardingDoc>();
  return stateFromOnboarding(user?.onboarding, "client");
}

export async function markClientTourCompleted(
  mode: "completed" | "skipped" = "completed",
) {
  const client = await getCurrentClient();
  if (!client || client.id === "demo-client") return { ok: false };

  await connectDb();
  const now = new Date();
  await ClientUser.updateOne(
    { _id: client.id },
    {
      $set: {
        "onboarding.dashboardTourCompleted": true,
        "onboarding.lastSeenTourVersion": TOUR_VERSION,
        ...(mode === "completed"
          ? {
              "onboarding.dashboardTourCompletedAt": now,
              "onboarding.dashboardTourSkippedAt": null,
            }
          : { "onboarding.dashboardTourSkippedAt": now }),
      },
    },
  );
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function resetClientTour() {
  const client = await getCurrentClient();
  if (!client || client.id === "demo-client") return { ok: false };

  await connectDb();
  await ClientUser.updateOne(
    { _id: client.id },
    {
      $set: {
        "onboarding.dashboardTourCompleted": false,
        "onboarding.dashboardTourCompletedAt": null,
        "onboarding.dashboardTourSkippedAt": null,
        "onboarding.lastSeenTourVersion": "",
      },
    },
  );
  revalidatePath("/dashboard");
  return { ok: true };
}
