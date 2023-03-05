import React from "react";

const Navigation = ({ onRouteChange , isSignedIn }) => {

    if (isSignedIn) {
        return (
            <nav style={{ display: "flex", justifyContent: "flex-end", marginRight: 50 }}>
                <p
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => onRouteChange("sigin")}>
                    Sign Out
                </p>
            </nav>
        )

    }
    else {

        return (
            <nav style={{ display: "flex", justifyContent: "flex-end", marginRight: 50 }}>
                <p
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => onRouteChange("sigin")}>
                    Sign In
                </p>

                <p
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => onRouteChange("register")}>
                    Register
                </p>

            </nav>
        )

    }

}

export default Navigation;