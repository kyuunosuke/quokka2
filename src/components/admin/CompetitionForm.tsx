import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "../../../supabase/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
  category: z.string().min(1, { message: "Please select a category" }),
  deadline: z.string().min(1, { message: "Please enter a deadline" }),
  prizeValue: z.string().min(1, { message: "Please enter a prize value" }),
  difficulty: z.enum(["easy", "medium", "hard"], {
    message: "Please select a difficulty level",
  }),
  requirements: z.string().min(10, {
    message: "Requirements must be at least 10 characters",
  }),
  rules: z
    .string()
    .min(10, { message: "Rules must be at least 10 characters" }),
  externalUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
  isCustomGame: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface CompetitionFormProps {
  competitionId?: string;
  onSuccess?: () => void;
}

const CompetitionForm = ({
  competitionId,
  onSuccess,
}: CompetitionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      category: "",
      deadline: "",
      prizeValue: "",
      difficulty: "medium",
      requirements: "",
      rules: "",
      externalUrl: "",
      isCustomGame: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      if (competitionId) {
        // Update existing competition
        const { error } = await supabase
          .from("competitions")
          .update({
            title: data.title,
            image_url: data.imageUrl,
            category: data.category,
            deadline: data.deadline,
            prize_value: data.prizeValue,
            difficulty: data.difficulty,
            requirements: data.requirements,
            rules: data.rules,
            external_url: data.externalUrl || null,
            is_custom_game: data.isCustomGame,
            updated_at: new Date().toISOString(),
          })
          .eq("id", competitionId);

        if (error) throw error;
        toast({
          title: "Competition updated",
          description: "The competition has been updated successfully.",
        });
      } else {
        // Create new competition
        const { error } = await supabase.from("competitions").insert({
          title: data.title,
          image_url: data.imageUrl,
          category: data.category,
          deadline: data.deadline,
          prize_value: data.prizeValue,
          difficulty: data.difficulty,
          requirements: data.requirements,
          rules: data.rules,
          external_url: data.externalUrl || null,
          is_custom_game: data.isCustomGame,
        });

        if (error) throw error;
        toast({
          title: "Competition created",
          description: "The competition has been created successfully.",
        });
        form.reset();
      }

      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Competition title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL to the competition image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Photography">Photography</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Writing">Writing</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Art">Art</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input placeholder="Jul 15, 2024" {...field} />
                  </FormControl>
                  <FormDescription>
                    Format: Month DD, YYYY or "Ongoing"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prizeValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prize Value</FormLabel>
                  <FormControl>
                    <Input placeholder="$1,000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="externalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/competition"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Link to the original competition page
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isCustomGame"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Custom Game Competition
                    </FormLabel>
                    <FormDescription>
                      This is a competition using our custom game platform
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter competition requirements"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rules"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rules</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter competition rules"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {competitionId ? "Update Competition" : "Create Competition"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CompetitionForm;
