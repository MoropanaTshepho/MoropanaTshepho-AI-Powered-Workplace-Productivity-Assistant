import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  loading?: boolean;
  content?: string;
  error?: string | null;
  title?: string;
}

export function AIOutput({ loading, content, error, title = "AI Output" }: Props) {
  const copy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  return (
    <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        {content && !loading && (
          <Button variant="ghost" size="sm" onClick={copy}>
            <Copy className="mr-2 h-3 w-3" /> Copy
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm">Generating with AI…</p>
          </div>
        )}
        {!loading && error && (
          <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            <AlertTriangle className="mt-0.5 h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        {!loading && !error && !content && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Output will appear here.
          </p>
        )}
        {!loading && content && (
          <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-li:my-0.5">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
        <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
          ⚠️ AI-generated content may require human review.
        </p>
      </CardContent>
    </Card>
  );
}
