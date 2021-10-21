using Microsoft.EntityFrameworkCore;

namespace TestWebAPI.Models
{
    public partial class UserDataBaseContext : DbContext
    {
        public UserDataBaseContext()
        {
        }

        public UserDataBaseContext(DbContextOptions<UserDataBaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=UserDataBase.mssql.somee.com;Database=UserDataBase;User Id=UserDBPRT;Password=UserDBPRTPassword");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.LastActivityDate).HasColumnType("date");

                entity.Property(e => e.RegestrationDate).HasColumnType("date");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
