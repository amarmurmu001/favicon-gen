import dynamic from "next/dynamic";

// Dynamically import the AdvancedTextToFavicon component
const AdvancedTextToFavicon = dynamic(() => import("../../components/TextToFavicon"), { // Disable server-side rendering for this component
});

const Page = () => {
  return (
    <div>
      <AdvancedTextToFavicon />
    </div>
  );
};

export default Page;

