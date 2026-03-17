# 🎨 Responsive Design Quick Reference

## Breakpoint Guide

```
Mobile First Approach:
┌─────────────────────────────────────────────────────────────────┐
│ Base Style (Mobile: 320px-639px)                                │
│  └─ sm: (640px+)      - Small tablets, large phones              │
│      └─ md: (768px+)  - Standard tablets, small laptops          │
│          └─ lg: (1024px+) - Desktops, large displays            │
│              └─ xl: (1280px+) - Extra large displays            │
└─────────────────────────────────────────────────────────────────┘
```

## Common Responsive Patterns Used

### 1. Responsive Padding (Most Common)
```jsx
// Pattern: p-{mobile} sm:p-{tablet} md:p-{desktop}
<div className="p-4 sm:p-6 md:p-8">Content</div>

// Mobile: 16px padding
// Tablet: 24px padding  
// Desktop: 32px padding
```

### 2. Responsive Typography (Headings)
```jsx
// Pattern: text-{mobile} sm:text-{tablet} md:text-{desktop}
<h1 className="text-xl sm:text-2xl md:text-3xl">Title</h1>

// Mobile: 20px
// Tablet: 24px
// Desktop: 30px
```

### 3. Responsive Flex Direction
```jsx
// Pattern: flex-col sm:flex-row - stack on mobile, row on tablet+
<div className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
  <button>Button 1</button>
  <button>Button 2</button>
</div>

// Mobile: stacked vertically, gap-3
// Tablet+: side by side, gap-4
```

### 4. Responsive Grid
```jsx
// Pattern: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* 1 column on mobile, 2 on tablet, 4 on desktop */}
</div>
```

### 5. Visible/Hidden Toggles
```jsx
// Pattern: hidden md:block - hide on mobile, show on tablet+
<div className="hidden md:block">Desktop only content</div>

// Pattern: md:hidden - show on mobile, hide on tablet+
<button className="md:hidden">Mobile Menu</button>
```

### 6. Responsive Width Constraints
```jsx
// Pattern: w-full sm:max-w-{size} md:max-w-{larger}
<input className="w-full sm:max-w-sm md:max-w-md" />

// Mobile: full width
// Tablet: max 384px (sm)
// Desktop: max 448px (md)
```

### 7. Responsive Spacing Between Items
```jsx
// Pattern: space-y-{mobile} sm:space-y-{tablet}
<div className="space-y-6 sm:space-y-8">
  {/* Each item separated by 24px on mobile, 32px on tablet+ */}
</div>
```

### 8. Responsive Gaps in Flex/Grid
```jsx
// Pattern: gap-{mobile} sm:gap-{tablet} md:gap-{desktop}
<div className="flex gap-2 sm:gap-3 md:gap-4">
  {/* 8px gap on mobile, 12px on tablet, 16px on desktop */}
</div>
```

---

## Implementing New Components

### Step 1: Start with Mobile Layout
```jsx
// WRONG - Start with desktop then try to reduce
<div className="p-8 text-3xl"> ❌

// RIGHT - Start with mobile, enhance upward
<div className="p-4 text-xl sm:text-2xl md:text-3xl"> ✅
```

### Step 2: Add Responsive Classes
```jsx
// Mobile defaults
className="
  p-4              // Mobile: 16px
  text-sm          // Mobile: 14px
  flex-col         // Mobile: vertical
  gap-3            // Mobile: 12px gap
  
  // Tablet enhancements
  sm:p-6           // Tablet: 24px
  sm:text-base     // Tablet: 16px
  sm:flex-row      // Tablet: horizontal
  sm:gap-4         // Tablet: 16px gap
  
  // Desktop enhancements
  md:p-8           // Desktop: 32px
  md:text-lg       // Desktop: 18px
"
```

### Step 3: Test at Each Breakpoint
```
Use Chrome DevTools:
1. Toggle device toolbar (Ctrl+Shift+M)
2. Test these widths:
   - 375px (iPhone SE)
   - 640px (sm breakpoint)
   - 768px (md breakpoint)
   - 1024px (lg breakpoint)
   - 1440px (desktop)
```

---

## Responsive Classes Reference

### Size Units (Tailwind)
```
p-1 = 4px    p-2 = 8px    p-3 = 12px   p-4 = 16px
p-5 = 20px   p-6 = 24px   p-7 = 28px   p-8 = 32px
```

### Text Sizes
```
text-xs = 12px
text-sm = 14px
text-base = 16px (default)
text-lg = 18px
text-xl = 20px
text-2xl = 24px
text-3xl = 30px
```

### Grid Columns
```
grid-cols-1 = 1 column
grid-cols-2 = 2 columns
grid-cols-3 = 3 columns
grid-cols-4 = 4 columns
```

---

## Common Mistakes to Avoid

### ❌ Don't use md: as the base
```jsx
// WRONG - Assumes md breakpoint exists
<div className="md:p-8">Content</div>

// RIGHT - Use base, then enhance with sm:, md:, lg:
<div className="p-4 sm:p-6 md:p-8">Content</div>
```

### ❌ Don't forget to test on actual mobile
```jsx
// Just checking in Chrome DevTools isn't enough
// Test on:
// - Actual iPhone/Android device
// - Landscape orientation
// - Touch interactions
// - Slow 4G network
```

### ❌ Don't use too many breakpoints
```jsx
// WRONG - Too specific
<div className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8">

// RIGHT - Use key breakpoints only
<div className="p-4 sm:p-6 md:p-8">
```

### ❌ Don't forget responsive typography
```jsx
// WRONG - Fixed size for all devices
<h1 className="text-3xl">Title</h1>

// RIGHT - Scale typography
<h1 className="text-xl sm:text-2xl md:text-3xl">Title</h1>
```

---

## Maintenance Checklist

When adding new components:

- [ ] Mobile layout looks good (320px)
- [ ] Tablet layout looks good (768px)
- [ ] Desktop layout looks good (1024px+)
- [ ] All text is readable on mobile
- [ ] Touch targets are at least 44x44px
- [ ] No horizontal overflow on any device
- [ ] Images/icons scale responsively
- [ ] Modals/drawers work on mobile
- [ ] Forms are mobile-friendly
- [ ] Navigation is accessible on mobile

---

## Key Files for Reference

**Responsive Implementation Examples:**
- `src/layouts/MainLayout.jsx` - Mobile sidebar pattern
- `src/pages/Dashboard/Dashboard.jsx` - Responsive grids & spacing
- `src/pages/Kanban/Kanban.jsx` - Modal stacking pattern
- `src/pages/Team/Team.jsx` - Table responsiveness

**Look for patterns:**
- `flex-col sm:flex-row` - Layout switching
- `p-4 sm:p-6 md:p-8` - Padding scaling
- `text-xl sm:text-2xl md:text-3xl` - Typography scaling
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` - Grid scaling
- `hidden md:block` - Visibility toggling

---

## Troubleshooting

### Problem: Element looks squished on mobile
**Solution:** Reduce padding/text size for mobile
```jsx
// Before: p-8 text-3xl (too large on mobile)
// After: p-4 text-xl sm:text-2xl md:text-3xl
```

### Problem: Content overflows on mobile
**Solution:** Add responsive width constraint
```jsx
// Before: max-w-4xl (too wide for mobile)
// After: w-full mx-4 sm:mx-6 max-w-sm sm:max-w-2xl lg:max-w-4xl
```

### Problem: Modal is unreadable on tablet
**Solution:** Stack content vertically on mobile/tablet
```jsx
// Before: flex (always side-by-side)
// After: flex flex-col lg:flex-row (stack on mobile, side-by-side on lg+)
```

### Problem: Buttons overlap on mobile
**Solution:** Make buttons stack and full-width
```jsx
// Before: flex items-center gap-3
// After: flex flex-col items-stretch sm:flex-row sm:items-center gap-2 sm:gap-3
```

---

## Build & Deploy

**Before deploying responsive changes:**

```bash
# 1. Build the project
npm run build

# 2. Check for errors (should see ✓)
# Look for: "✓ built in X.XXs"

# 3. Test in different browsers:
- Chrome DevTools (device emulation)
- Firefox (responsive mode)
- Safari (if on Mac)
- Actual mobile devices if possible

# 4. Test at each breakpoint:
- 375px (sm phone)
- 640px (sm breakpoint)
- 768px (md breakpoint)
- 1024px (lg breakpoint)
- 1440px (desktop)
```

---

## Speed Tips for Development

**Quick responsive testing in DevTools:**
```
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Click "Edit" next to device dropdown
4. Add custom devices:
   - Mobile: 375x667
   - Tablet: 768x1024
   - Desktop: 1440x900
5. Refresh and test at each breakpoint
```

---

**Last Updated:** March 18, 2026  
**Maintained By:** Development Team  
**Status:** ✅ Current & Complete
