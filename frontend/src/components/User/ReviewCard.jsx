import Button from "./Button";
import { Link } from "react-router-dom";

const ReviewsCard = () => {
  return (
    <div className="bg-[#fef5f0] rounded-xl shadow-md p-4 sm:p-6 flex flex-col gap-4">
      {/* Header */}
      <h2 className="text-base sm:text-lg font-semibold mb-1">
        ⭐ Reviews & Ratings
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">
        Share your safari experiences
      </p>

      {/* Stats */}
      <div className="flex flex-col ">      

       <div className="text-3xl font-bold">7</div>
      <div className="text-sm ">
        {" "}
        
        🕒 2 safaris to review
      </div>
 </div>
      {/* Button */}
     <Link to="reviews">        <Button
        label="Write a Review"
        className="bg-orange-400 text-white w-full py-2 mt-2 rounded-md hover:bg-orange-500 transition duration-200 text-sm sm:text-base"
      />
      </Link>
    </div>
  );
};

export default ReviewsCard;
