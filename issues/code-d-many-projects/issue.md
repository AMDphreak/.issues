# Issue Report: Improve Many Projects Loading UX in code-d VS Code Plugin

## Issue Summary

When a D workspace contains many projects that exceed the `d.manyProjectsThreshold` setting, the code-d plugin repeatedly shows toast notifications asking the user whether to load each project individually. This creates a tedious and frustrating user experience when working with large monorepos or projects with many sub-projects.

## Current Behavior

The current implementation in `src/extension.ts` (lines 339-406) shows a notification for each batch of projects that exceed the threshold:

1. **Repetitive Notifications**: Each time the threshold is exceeded, a new toast notification appears
2. **Limited Information**: The notification only shows the number of projects, not details about which ones or their sizes
3. **Poor UX Flow**: Users must repeatedly make decisions for similar project sets
4. **No Context**: Users don't know which projects are recommended vs. over the limit

## Problems Identified

### 1. Notification Spam
- File: `src/extension.ts`, function `coded/skippedLoads`
- Lines 378-385: Shows generic message without project details
- No indication of project sizes or complexity

### 2. Inadequate Information Display
- Current message: "There are too many subprojects in this project according to d.manyProjectsThreshold. Load X extra projects?"
- Missing: Project names, sizes, line counts, or why they exceed threshold

### 3. Suboptimal Default Behavior
- Should attempt to load smaller projects automatically while warning about larger ones
- Currently requires manual approval for all projects over threshold

## Proposed Solution

### Phase 1: Enhanced Notification System

1. **Improve Toast Notification Content**
   - Show number of recommended projects (under threshold)
   - Show number of projects over limit with total line count
   - Display project names or paths for context
   - Include a "Smart Load" button that loads small projects automatically

2. **Add Project Size Analysis**
   - Analyze project line counts before showing notification
   - Categorize projects: Small (auto-load), Medium (ask), Large (warn)
   - Show total estimated load time/memory usage

### Phase 2: Intelligent Loading Strategy

1. **Automatic Loading with Warnings**
   - Auto-load projects under a certain line count (e.g., < 10,000 lines)
   - Show a single warning notification listing auto-loaded projects
   - Only ask for approval on medium/large projects

2. **Enhanced Interactive Selection**
   - Improve the `lateInitInteractive` function to show:
     - Project names/paths
     - Line counts and file counts
     - Estimated load times
     - Color coding by size category

### Phase 3: Configuration Options

Add new configuration settings:
- `d.manyProjectsAutoLoadThreshold`: Line count threshold for automatic loading
- `d.manyProjectsShowProjectDetails`: Show detailed project info in notifications
- `d.manyProjectsSmartLoading`: Enable intelligent loading strategy

## Implementation Plan

### 1. Enhanced Notification (High Priority)
```typescript
// In extension.ts, coded/skippedLoads handler
const projectDetails = await analyzeProjects(roots);
const smallProjects = projectDetails.filter(p => p.lineCount < autoLoadThreshold);
const largeProjects = projectDetails.filter(p => p.lineCount >= autoLoadThreshold);

const msg = `Found ${roots.length} projects (${smallProjects.length} small, ${largeProjects.length} large). ` +
          `Auto-load ${smallProjects.length} small projects and ask about ${largeProjects.length} large ones?`;
```

### 2. Project Analysis Function
```typescript
async function analyzeProjects(roots: string[]): Promise<ProjectInfo[]> {
    // Analyze each project for line count, file count, complexity
    // Return structured information for decision making
}
```

### 3. Smart Loading Logic
```typescript
async function smartLoadProjects(projectInfo: ProjectInfo[]) {
    const autoLoad = projectInfo.filter(p => p.lineCount < autoLoadThreshold);
    const askUser = projectInfo.filter(p => p.lineCount >= autoLoadThreshold);
    
    // Auto-load small projects
    if (autoLoad.length > 0) {
        served.forceLoadProjects(autoLoad.map(p => p.path));
        showAutoLoadNotification(autoLoad);
    }
    
    // Ask about larger projects
    if (askUser.length > 0) {
        showProjectSelectionDialog(askUser);
    }
}
```

## Benefits

1. **Reduced Notification Fatigue**: Fewer, more informative notifications
2. **Improved Productivity**: Automatic loading of small projects speeds up workflow
3. **Better Decision Making**: Users can make informed choices based on project details
4. **Scalability**: Works better with large monorepos and complex project structures
5. **Backward Compatibility**: Existing configuration options continue to work

## Configuration Impact

- New settings will have sensible defaults
- Existing `d.manyProjectsThreshold` behavior preserved
- Users can opt-in to smart loading features
- Workspace-level settings allow per-project customization

## Testing Strategy

1. **Unit Tests**: Test project analysis and categorization logic
2. **Integration Tests**: Test notification flow with various project sizes
3. **User Testing**: Gather feedback on notification UX improvements
4. **Performance Tests**: Ensure project analysis doesn't slow startup

## Files to Modify

1. `src/extension.ts` - Main notification and loading logic
2. `package.json` - Add new configuration options
3. `src/util.ts` - Add project analysis utilities
4. `src/test/` - Add tests for new functionality

## Backward Compatibility

- All existing configuration options remain functional
- New features are opt-in via default settings
- Current notification flow available as fallback
- No breaking changes to existing APIs

## Conclusion

This enhancement significantly improves the developer experience when working with large D workspaces while maintaining full backward compatibility. The phased approach allows for incremental improvement and user feedback integration.
