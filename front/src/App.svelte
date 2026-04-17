<script>
  import { Button } from '$lib/components/ui/button';
  import "./app.css";
</script>

<main
  class="flex min-h-screen flex-col items-center justify-center p-24 space-y-4"
>
  <h1 class="text-4xl font-bold text-primary">SDM-Clone Start!</h1>
  <p class="text-muted-foreground">Svelte 4 + Tailwind + shadcn-svelte (Manual)</p>

  <div class="flex gap-4">
    <Button>기본 버튼</Button>
    <Button variant="outline">아웃라인 버튼</Button>
    <Button variant="destructive" size="sm">삭제 버튼 (Small)</Button>
  </div>
</main>

