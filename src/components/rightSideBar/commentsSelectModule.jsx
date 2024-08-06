import { Card, CardContent, Typography, Container } from "@mui/material";

// PlaceholderCard component
const PlaceholderCard = () => (
  <Card className="w-full mb-4">
    {" "}
    {/* Full-width and bottom margin */}
    <CardContent>
      <Typography variant="h5" component="div">
        Placeholder Title
      </Typography>
      <Typography variant="body2">
        Placeholder content. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </Typography>
    </CardContent>
  </Card>
);

export default function CommentsSelectModule() {
  return (
    <>
      <p>Comments:</p>
      <div className="overflow-y-auto max-h-full">
        {" "}
        {/* Scrollable and limited height */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className="w-full mb-4">
            {" "}
            {/* Ensure full width and space between cards */}
            <PlaceholderCard />
          </div>
        ))}
      </div>
    </>
  );
}
