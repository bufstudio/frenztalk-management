import { auth, db } from "@/lib/firebase/service/serverApp";
import { cookies, headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(session, true);
    
    // Fetch user role from Firestore
    const userDoc = await db.collection('users').doc(decodedClaims.uid).get();
    if (!userDoc.exists) {
      console.error("User document does not exist");
      return NextResponse.json({ isLogged: true, role: null }, { status: 200 });
    }

    const userData = userDoc.data();
    return NextResponse.json({ isLogged: true, role: userData?.role }, { status: 200 });
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get("Authorization");

  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(idToken);

    if (decodedToken) {
      //Generate session cookie
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      //Add the cookie to the browser
      cookies().set(options);
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  const token = cookies().get("session")?.value || "";
  if (!token) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
  await invalidateLogin(token);
  return NextResponse.json({}, { status: 200 });
}

async function invalidateLogin(token: string) {
  try {
    const decodedClaims = await auth.verifySessionCookie(token, true);
    await auth.revokeRefreshTokens(decodedClaims.uid);
    cookies().delete("session");
  } catch (error) {
    console.error("Error invalidating login:", error);
  }
}
