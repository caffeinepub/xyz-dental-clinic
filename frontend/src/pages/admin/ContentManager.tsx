import { useState } from 'react';
import { useAddReview } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Star } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function ContentManager() {
  const addReview = useAddReview();
  const [reviewerName, setReviewerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewerName.trim() || !reviewText.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await addReview.mutateAsync({
        reviewerName: reviewerName.trim(),
        text: reviewText.trim(),
        rating: BigInt(rating),
        photo: null,
        beforeAfterImage: null,
      });
      toast.success('Review added successfully!');
      setReviewerName('');
      setReviewText('');
      setRating(5);
    } catch (error) {
      console.error('Failed to add review:', error);
      toast.error('Failed to add review');
    }
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link to="/admin/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">Content Manager</h1>
        <p className="text-muted-foreground">Manage reviews and testimonials</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Add New Review</CardTitle>
            <CardDescription>Add patient testimonials to showcase on the website</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reviewerName">Patient Name</Label>
                <Input
                  id="reviewerName"
                  placeholder="Enter patient name"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviewText">Review Text</Label>
                <Textarea
                  id="reviewText"
                  placeholder="Enter the review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={addReview.isPending}>
                {addReview.isPending ? 'Adding Review...' : 'Add Review'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
