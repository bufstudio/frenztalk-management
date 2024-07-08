import Link from "next/link";
import NavLinks from "./nav-links";
import styles from "../../styles/components/dashboard/SideNav.module.scss";
import Image from "next/image";

export default function SideNav() {
  const user = {
    name: "Steve Jobs",
    profilePic: "/steveJobs.png",
  };

  const handleSignOut = () => {
    console.log("Signing out...");
  }

  return (
    <div className={styles.sideNav}>
      <Link className={styles.logo} href="/">
        <Image
          src="/frenztalk-logo.jpg"
          alt="Frenztalk Logo"
          priority
          width={120}
          height={120}
        />
      </Link>
      <div className={styles.profileContainer}>
        <Link className={styles.profile} href="/">
          <Image
            src={user.profilePic}
            alt={`${user.name}'s profile picture`}
            width={40}
            height={40}
            className={styles.profilePic}
          />
          <div className={styles.profileInfo}>
            <p className={styles.profileName}>{user.name}</p>
            <p className={styles.profileEmail}>Admin</p>
          </div>
        </Link>
      </div>
      <div className={styles.navContainer}>
        <NavLinks />
      </div>
      <div className={styles.spacer} />
      <button type="button" className={styles.signOutButton} onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}
